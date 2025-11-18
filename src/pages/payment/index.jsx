import React from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPayments} from "../../store/slices/paymentSlice";
import { useEffect } from "react";
import { selectPayment, selectPaymentLoading } from "../../store/selectors/paymentSelectors";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";


const PaymentPage = () => {

const dispatch = useDispatch();
const payments = useSelector(selectPayment);
// console.log("Payments in PaymentPage:", payments);
const loading = useSelector(selectPaymentLoading);
useEffect(() => {
    dispatch(fetchAllPayments());
}, [dispatch]);


  return(
    <div className="max-w-5xl mx-auto p-6 space-y-8">
        <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Payment Fee Structures</CardTitle>
        </CardHeader>
       
        </Card>

        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fee Structure ID</TableHead>
                        <TableHead>Structure Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                  {/* payment?(...):(...):(...) */}
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : payments?.data && payments?.data.length > 0 ? (
                        payments?.data.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.name}</TableCell>
                                <TableCell>{payment.code}</TableCell>
                                <TableCell>{payment.total_amount}</TableCell>
                                <TableCell>{payment.is_active ? "Yes" : "No"}</TableCell>
                                <TableCell>{payment.description}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No payment fee structures found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
              </Table>
        </div>
    </div>
  ) 
}
export default PaymentPage;