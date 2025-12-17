import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllPayments,
    fetchFeeStructureById,
} from "../../store/slices/paymentSlice";

import {
    selectPayment,
    selectPaymentLoading,
    selectFullFeeStructureById,
} from "../../store/selectors/paymentSelectors";

import { createFeeStructure, createFeeHead, createFeeInstallment, createFeeDiscount, createFineRule } from "../../store/slices/feeStructureSlice";
import Swal from "sweetalert2";


/* =======================
BASIC STYLES
======================= */
const inputClass =
    "w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#496F63] focus:border-[#496F63]";

const errorClass = "text-red-500 text-xs mt-1";

const sectionTitle = "text-sm font-semibold text-gray-700";


const formSchema = z.object({
    fee_structure: z.object({
        name: z.string().min(3, "Name is required"),
        code: z.string().min(3, "Code is required"),
        description: z.string().optional(),
        // phase_id: z.number().optional(),
        // subgroup_id: z.number().optional(),
    }),

    fee_heads: z.array(
        z.object({
            name: z.string().min(1, "Fee head name required"),
            amount: z
                .number({ invalid_type_error: "Amount must be a number" })
                .positive("Amount must be greater than 0"),
        })
    ).min(1, "Add at least one fee head"),

    installments: z.array(
        z.object({
            installment_no: z.coerce.number().min(1, "Installment number required"),
            installment_type: z.string(),
            due_date: z.string().min(1, "Date required"),
            amount: z
                .number({ invalid_type_error: "Amount must be a number" })
                .positive("Amount must be greater than 0"),
        })
    ).min(1, "Add at least one installment"),

    discounts: z
        .array(
            z.object({
                name: z.string().min(1, "Discount name required"),
                description: z.string().optional(),
                discount_type: z.enum(["PERCENTAGE", "FIXED"]),
                amount: z.number().positive("Amount required"),
                // applies_to_head_id: z.array(z.number()),
            })
        )
        .optional()

});


/* =====================================================
   COMPONENT
===================================================== */

function FeeStructureModal({ open, onClose }) {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const {
        register,
        control,
        handleSubmit,
        trigger,
        formState: { errors },

    } = useForm({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {
            fee_structure: {
                name: "",
                code: "",
                description: "",
                phase_id: null,
                subgroup_id: null,
            },
            fee_heads: [{ name: "", amount: undefined }],
            installments: [
                {
                    installment_no: null,
                    installment_type: "",
                    due_date: "",
                    amount: null,
                },
            ],
            discounts: [{
                name: "Merit Scholarship",
                description: "10% off for top 5 students",
                discount_type: "PERCENTAGE",
                amount: 10,
                applies_to_head_id: 2
            }],
        },
    });

    /* ================= FIELD ARRAYS ================= */

    const feeHeads = useFieldArray({ control, name: "fee_heads" });
    const installments = useFieldArray({ control, name: "installments" });
    const discounts = useFieldArray({ control, name: "discounts" });

    /* ================= STEP NAV ================= */

    const next = async () => {
        let valid = false;

        if (step === 1)
            valid = await trigger([
                "fee_structure.name",
                "fee_structure.code",
                "fee_structure.phaseId",
                "fee_structure.subGroupId",
            ]);

        if (step === 2) valid = await trigger("fee_heads");
        if (step === 3) valid = await trigger("installments");
        if (step === 4) valid = await trigger("discounts");

        if (valid) setStep(step + 1);
    };

    const back = () => setStep(step - 1);

    /* ================= SUBMIT ================= */

    const onSubmit = async (data) => {
        try {
            /* ===============================
               LOADING ALERT
            =============================== */

            Swal.fire({
                title: "Creating Fee Structure...",
                text: "Please wait while we save the details",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            /* ===============================
               1️⃣ CREATE FEE STRUCTURE
            =============================== */

            const feeStructureRes = await dispatch(
                createFeeStructure(data.fee_structure)
            ).unwrap();

            const feeStructureId = feeStructureRes.id;

            /* ===============================
               2️⃣ CREATE FEE HEADS
            =============================== */

            await dispatch(
                createFeeHead({
                    fee_structure_id: feeStructureId,
                    heads: data.fee_heads,
                })
            ).unwrap();

            /* ===============================
               3️⃣ CREATE INSTALLMENTS
            =============================== */

            const normalizedInstallments = data.installments.map((inst) => ({
                installment_no: Number(inst.installment_no),
                installment_type: inst.installment_type,
                due_date: new Date(inst.due_date).toISOString(),
                amount: Number(inst.amount),
            }));

            await dispatch(
                createFeeInstallment({
                    installments: normalizedInstallments,
                    fee_structure_id: feeStructureId,
                })
            ).unwrap();

            /* ===============================
               4️⃣ CREATE DISCOUNTS
            =============================== */

            if (data.discounts?.length) {
                await dispatch(
                    createFeeDiscount({
                        discounts: data.discounts,
                        fee_structure_id: feeStructureId,
                    })
                ).unwrap();
            }

            /* ===============================
               SUCCESS ALERT
            =============================== */

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Fee structure created successfully",
                confirmButtonColor: "#496F63",
            });

            onClose(false);

        } catch (error) {
            console.error("Failed to create fee structure flow:", error);

            /* ===============================
               ERROR ALERT
            =============================== */

            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text:
                    error?.message ||
                    "Failed to create fee structure. Please try again.",
                confirmButtonColor: "#d33",
            });
        }
    };


    /* =====================================================
       UI
    ===================================================== */

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-0 rounded-2xl overflow-hidden">
                <div className="flex">

                    {/* SIDEBAR */}
                    <div className="w-1/3 bg-[#496F63] text-white p-8 space-y-6 font-semibold">
                        {["Fees Info", "Add Heads", "Installments", "Discounts"].map(
                            (s, i) => (
                                <div key={i} className={step === i + 1 ? "" : "opacity-50"}>
                                    STEP {i + 1}
                                    <br />
                                    {s}
                                </div>
                            )
                        )}
                    </div>

                    {/* CONTENT */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 p-6">

                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                                Fee Structure
                            </DialogTitle>
                        </DialogHeader>

                        {/* ================= STEP 1 ================= */}
                        {step === 1 && (
                            <div className="space-y-4 mt-6">
                                <div>
                                    <label className={sectionTitle}>Name</label>
                                    <input
                                        {...register("fee_structure.name")}
                                        placeholder="Tuition Fee"
                                        className={inputClass}
                                    />
                                    <p className={errorClass}>{errors.fee_structure?.name?.message}</p>
                                </div>

                                <div>
                                    <label className={sectionTitle}>Code</label>
                                    <input
                                        {...register("fee_structure.code")}
                                        placeholder="TUITION_01"
                                        className={inputClass}
                                    />
                                    <p className={errorClass}>{errors.fee_structure?.code?.message}</p>
                                </div>

                                <div>
                                    <label className={sectionTitle}>Description</label>
                                    <input
                                        {...register("fee_structure.description")}
                                        placeholder="Optional description"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={sectionTitle}>Phase</label>
                                        <select {...register("fee_structure.phaseId")} className={inputClass}>
                                            <option value="">Select Phase</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={sectionTitle}>Subgroup</label>
                                        <select {...register("fee_structure.subGroupId")} className={inputClass}>
                                            <option value="">Select Subgroup</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button className="bg-[#496F63] hover:bg-[#3f5f55]" onClick={next}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}


                        {/* ================= STEP 2 ================= */}
                        {step === 2 && (
                            <div className="space-y-4 mt-6">
                                {feeHeads.fields.map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-3 p-3 rounded-md border bg-gray-50"
                                    >
                                        <input
                                            {...register(`fee_heads.${i}.name`)}
                                            placeholder="Fee Head Name"
                                            className={inputClass}
                                        />
                                        <input
                                            type="number"
                                            {...register(`fee_heads.${i}.amount`, { valueAsNumber: true })}
                                            placeholder="Amount"
                                            className={inputClass}
                                        />
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={() => feeHeads.append({ name: "", amount: undefined })}
                                >
                                    + Add Head
                                </Button>

                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" onClick={back}>
                                        Previous
                                    </Button>
                                    <Button className="bg-[#496F63]" onClick={next}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}


                        {/* ================= STEP 3 ================= */}
                        {step === 3 && (
                            <div className="space-y-4 mt-6">
                                {installments.fields.map((_, i) => (
                                    <div
                                        key={i}
                                        className="mt-4 space-y-4"
                                    >

                                        <label className={sectionTitle}>Installment No</label>
                                        <input
                                            type="number"
                                            {...register(`installments.${i}.installment_no`)}
                                            placeholder="Installment No"
                                            className={inputClass}
                                        />
                                        <label className={sectionTitle}>Installment Type</label>
                                        <select
                                            {...register(`installments.${i}.installment_type`, {
                                                valueAsNumber: false,
                                            })}
                                            className={inputClass}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="MONTHLY">Monthly</option>
                                            <option value="QUARTERLY">Quarterly</option>
                                        </select>

                                        <label className={sectionTitle}>Due Date</label>
                                        <input
                                            type="date"
                                            {...register(`installments.${i}.due_date`)}
                                            className={inputClass}
                                        />
                                        <label className={sectionTitle}>Amount</label>

                                        <input
                                            type="number"
                                            {...register(`installments.${i}.amount`, { valueAsNumber: true })}
                                            placeholder="Amount"
                                            className={inputClass}
                                        />
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        installments.append({
                                            installment_no: "",
                                            installment_type: 1,
                                            due_date: "",
                                            amount: undefined,
                                        })
                                    }
                                >
                                    + Add Installment
                                </Button>

                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" onClick={back}>
                                        Previous
                                    </Button>
                                    <Button className="bg-[#496F63]" onClick={next}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* ================= STEP 4 ================= */}
                        {step === 4 && (
                            <div className="space-y-6 mt-6">

                                {/* ADD DISCOUNT BUTTON */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        discounts.append({
                                            name: "",
                                            description: "",
                                            discount_type: "PERCENTAGE",
                                            amount: 1,
                                            applies_to_head_id: [],
                                        })
                                    }
                                >
                                    + Add Discount
                                </Button>

                                {/* DISCOUNT LIST */}
                                {discounts.fields.map((discount, i) => (
                                    <div
                                        key={discount.id}
                                        className="p-4 rounded-lg border bg-gray-50 space-y-4"
                                    >

                                        {/* NAME */}
                                        <div>
                                            <label className="text-sm font-medium">Discount Name</label>
                                            <input
                                                {...register(`discounts.${i}.name`)}
                                                placeholder="Merit Discount"
                                                className={inputClass}
                                            />
                                            <p className={errorClass}>
                                                {errors.discounts?.[i]?.name?.message}
                                            </p>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div>
                                            <label className="text-sm font-medium">Description</label>
                                            <input
                                                {...register(`discounts.${i}.description`)}
                                                placeholder="10% off for top students"
                                                className={inputClass}
                                            />
                                        </div>

                                        {/* TYPE + AMOUNT */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm font-medium">Discount Type</label>
                                                <select
                                                    {...register(`discounts.${i}.discount_type`)}
                                                    className={inputClass}
                                                >
                                                    <option value="PERCENTAGE">Percentage</option>
                                                    <option value="FIXED">Fixed</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium">Amount</label>
                                                <input
                                                    type="number"
                                                    {...register(`discounts.${i}.amount`, { valueAsNumber: true })}
                                                    placeholder="10"
                                                    className={inputClass}
                                                />
                                                <p className={errorClass}>
                                                    {errors.discounts?.[i]?.amount?.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* APPLY TO FEE HEADS */}
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Applies To Fee Heads
                                            </label>

                                            <div className="grid grid-cols-2 gap-2">
                                                {feeHeads.fields.map((head, hIndex) => (
                                                    <label
                                                        key={head.id}
                                                        className="flex items-center gap-2 text-sm"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={hIndex + 1} // replace with head.id from API
                                                            {...register(
                                                                `discounts.${i}.applies_to_head_id`,
                                                                { valueAsNumber: true }
                                                            )}
                                                        />
                                                        {head.name || `Head ${hIndex + 1}`}
                                                    </label>
                                                ))}
                                            </div>

                                            <p className={errorClass}>
                                                {errors.discounts?.[i]?.applies_to_head_id?.message}
                                            </p>
                                        </div>

                                        {/* REMOVE DISCOUNT */}
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => discounts.remove(i)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {/* NAVIGATION */}
                                <div className="flex justify-between pt-6">
                                    <Button type="button" variant="outline" onClick={back}>
                                        Previous
                                    </Button>
                                    <Button type="submit" className="bg-[#496F63]">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        )}

                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}



// PAYMENT PAGE STARTS BELOW

const PaymentPage = () => {



    const dispatch = useDispatch();

    // Redux data
    const payments = useSelector(selectPayment);
    const fullStructureById = useSelector(selectFullFeeStructureById);
    const loading = useSelector(selectPaymentLoading);

    // UI states
    const [activeTab, setActiveTab] = useState("details");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // NEW: Add popup modal for + icon
    const [showAddModal, setShowAddModal] = useState(false);


    useEffect(() => {
        dispatch(fetchAllPayments());
        dispatch(fetchFeeStructureById(2));
    }, [dispatch]);

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* HEADER */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">
                            Payment Fee Structures
                        </CardTitle>

                        {/* PLUS BUTTON */}
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="w-9 h-9 border rounded-md flex items-center justify-center text-xl font-bold"
                        >
                            +
                        </button>
                    </div>
                </CardHeader>
            </Card>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fee ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {payments?.data?.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.name}</TableCell>
                                <TableCell>{payment.code}</TableCell>
                                <TableCell>{payment.total_amount}</TableCell>
                                <TableCell>{payment.is_active ? "Yes" : "No"}</TableCell>
                                <TableCell>{payment.description}</TableCell>

                                <TableCell>
                                    <button
                                        onClick={() => {
                                            setSelectedPayment(payment);
                                            setShowDetailsModal(true);
                                        }}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>


            {/* ADD MODAL (4 STEP) */}
            <FeeStructureModal open={showAddModal} onClose={setShowAddModal} />

        </div>
    );
};



export default PaymentPage;