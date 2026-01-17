import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryByFilter,
} from "@/store/slices/frontOfficeSlice";

import {
  selectEnquiries,
  selectFrontOfficeLoading,
} from "@/store/selectors/frontOfficeSelectors";

const EnquiryPage = () => {
  const dispatch = useDispatch();
  const enquiries = useSelector(selectEnquiries);
  console.log("Enquiries Data:", enquiries);
  const loading = useSelector(selectFrontOfficeLoading);

  const { register, handleSubmit, reset, setValue } = useForm();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filters, setFilters] = useState({
    classroomId: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  /* =======================
     INITIAL LOAD
  ======================== */
  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);

  /* =======================
     CREATE ENQUIRY
  ======================== */
  const onSubmit = (data) => {
    const convertedData = {
      ...data,
      classroomId: Number(data.classroomId),
      assignedUserId: Number(data.assignedUserId),
    };
    dispatch(createEnquiry(convertedData)).then((result) => {
      console.log("Dispatch result:", result);
      if (result.type === "frontOffice/createEnquiry/fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Enquiry created successfully",
          confirmButtonText: "OK",
        }).then(() => {
          reset();
          setIsFormOpen(false);
          dispatch(getAllEnquiries());
        });
      } else if (result.type === "frontOffice/createEnquiry/rejected") {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.payload?.message || "Failed to create enquiry",
          confirmButtonText: "OK",
        });
      }
    });
  };

  /* =======================
     APPLY FILTER
  ======================== */
  const applyFilter = () => {
    dispatch(getEnquiryByFilter(filters));
  };

  const resetFilter = () => {
    setFilters({
      classroomId: "",
      status: "",
      fromDate: "",
      toDate: "",
    });
    dispatch(getAllEnquiries());
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      {/* ================= CREATE ENQUIRY BUTTON ================= */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button>Create Enquiry</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Enquiry</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new enquiry
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input placeholder="Name" {...register("name", { required: true })} />
            <Input placeholder="Phone" {...register("phone", { required: true })} />
            <Input placeholder="Email" {...register("email")} />
            <Textarea placeholder="Address" {...register("address")} />
            <Textarea placeholder="Description" {...register("description")} className="md:col-span-2" />

            <Select onValueChange={(v) => setValue("source", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Enquiry Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WEBSITE">Website</SelectItem>
                <SelectItem value="WALK_IN">Walk-in</SelectItem>
                <SelectItem value="PHONE">Phone</SelectItem>
                <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Classroom ID"
              {...register("classroomId", { required: true })}
            />
            <Input
              type="number"
              placeholder="Assigned User ID"
              {...register("assignedUserId", { required: true })}
            />

            <div className="md:col-span-2 flex gap-3">
              <Button 
                type="submit"
                className="flex-1" 
                disabled={loading}
              >
                {loading ? "Saving..." : "Create Enquiry"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= FILTERS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Enquiries</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Classroom ID"
            value={filters.classroomId}
            onChange={(e) =>
              setFilters({ ...filters, classroomId: e.target.value })
            }
          />

          <Select
            value={filters.status}
            onValueChange={(v) => setFilters({ ...filters, status: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">NEW</SelectItem>
              <SelectItem value="FOLLOW_UP">FOLLOW UP</SelectItem>
              <SelectItem value="CONVERTED">CONVERTED</SelectItem>
              <SelectItem value="CLOSED">CLOSED</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
          />

          <Input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
          />

          <div className="flex gap-2">
            <Button onClick={applyFilter} className="w-full">
              Apply
            </Button>
            {/* <Button variant="outline" onClick={resetFilter} className="w-full">
              Reset
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* ================= ENQUIRY LIST ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No enquiries found
                  </TableCell>
                </TableRow>
              )}

              {enquiries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{e.status}</Badge>
                  </TableCell>
                  <TableCell>{e.classroomId}</TableCell>
                  <TableCell>
                    {new Date(e.enquiryDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
};

export default EnquiryPage;
