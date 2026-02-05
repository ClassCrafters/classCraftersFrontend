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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Eye } from "lucide-react";

import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryByFilter,
} from "@/store/slices/frontOfficeSlice";

import {
  fetchAllUser
} from "@/store/slices/userSlice";

import {
  getClassroom
} from "@/store/slices/classRoomSlice";

import { selectUser } from "@/store/selectors/userSelectors";
import {
  selectEnquiries,
  selectFrontOfficeLoading,
} from "@/store/selectors/frontOfficeSelectors";

import {
  selectClassrooms
} from "@/store/selectors/classRoomSelectors";

const EnquiryPage = () => {
  const dispatch = useDispatch();
  const enquiries = useSelector(selectEnquiries);
  const classroom = useSelector(selectClassrooms);
  const user = useSelector(selectUser);
  const loading = useSelector(selectFrontOfficeLoading);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      classroomId: "",
      assignedUserId: "",
    },
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filters, setFilters] = useState({
    classroomId: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const [openEnquiryView, setOpenEnquiryView] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenEnquiryView(true);
  }

  /* =======================
     INITIAL LOAD
  ======================== */
  useEffect(() => {
    dispatch(getAllEnquiries());
    dispatch(getClassroom());
    dispatch(fetchAllUser());
  }, [dispatch]);

  /* =======================
     CREATE ENQUIRY
  ======================== */
  const onSubmit = async (data) => {
    const convertedData = {
      ...data,
      classroomId: Number(data.classroomId),
      assignedUserId: Number(data.assignedUserId),
    };

    try {
      await dispatch(createEnquiry(convertedData)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Enquiry created successfully",
        confirmButtonText: "OK",
      });

      reset();
      setIsFormOpen(false); // ✅ close form
      dispatch(getAllEnquiries());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.message || "Failed to create enquiry",
        confirmButtonText: "OK",
      });
    }
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

  const classroomId = watch("classroomId");
  const assignedUserId = watch("assignedUserId");
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Enquiries</h1>
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

              {/* <Input
              type="number"
              placeholder="Classroom ID"
              {...register("classroomId", { required: true })}
            /> */}

              <Select
                value={classroomId}
                onValueChange={(v) => setValue("classroomId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Classroom" />
                </SelectTrigger>

                <SelectContent>
                  {classroom?.map((cls) => (
                    <SelectItem key={cls.id} value={String(cls.id)}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={assignedUserId}
                onValueChange={(v) => setValue("assignedUserId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>

                <SelectContent>
                  {user?.data?.users?.map((v) => (
                    <SelectItem key={v.id} value={String(v.id)}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>



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
      </div>
      {/* ================= CREATE ENQUIRY BUTTON ================= */}


      {/* ================= FILTERS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Enquiries</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Classroom */}
          <div className="md:col-span-3">
            <Select
              value={filters.classroomId}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, classroomId: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Classroom" />
              </SelectTrigger>
              <SelectContent>
                {classroom?.map((cls) => (
                  <SelectItem key={cls.id} value={String(cls.id)}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <Select
              value={filters.status}
              onValueChange={(v) =>
                setFilters((prev) => ({ ...prev, status: v }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">NEW</SelectItem>
                <SelectItem value="FOLLOW_UP">FOLLOW UP</SelectItem>
                <SelectItem value="CONVERTED">CONVERTED</SelectItem>
                <SelectItem value="CLOSED">CLOSED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* From Date */}
          <div className="md:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.fromDate
                    ? format(new Date(filters.fromDate), "PPP")
                    : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.fromDate ? new Date(filters.fromDate) : undefined}
                  onSelect={(date) =>
                    setFilters((prev) => ({
                      ...prev,
                      fromDate: date ? format(date, "yyyy-MM-dd") : "",
                    }))
                  }
                  disabled={(date) =>
                    filters.toDate && date > new Date(filters.toDate)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* To Date */}
          <div className="md:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.toDate
                    ? format(new Date(filters.toDate), "PPP")
                    : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.toDate ? new Date(filters.toDate) : undefined}
                  onSelect={(date) =>
                    setFilters((prev) => ({
                      ...prev,
                      toDate: date ? format(date, "yyyy-MM-dd") : "",
                    }))
                  }
                  disabled={(date) =>
                    filters.fromDate && date < new Date(filters.fromDate)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Apply */}
          <div className="md:col-span-1">
            <Button onClick={applyFilter} className="w-full">
              Apply
            </Button>
          </div>

          {/* Reset */}
          <div className="md:col-span-1">
            <Button variant="outline" onClick={resetFilter} className="w-full">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* ================= ENQUIRY LIST ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries</CardTitle>
        </CardHeader>

        <Dialog open={openEnquiryView} onOpenChange={setOpenEnquiryView}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Enquiry Details</DialogTitle>
              <DialogDescription>
                Complete enquiry information
              </DialogDescription>
            </DialogHeader>

            {selectedEnquiry && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {/* Name */}
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-gray-600">{selectedEnquiry.name}</p>
                </div>

                {/* Phone */}
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{selectedEnquiry.phone}</p>
                </div>

                {/* Email */}
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.email || "—"}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.address || "—"}
                  </p>
                </div>

                {/* Classroom */}
                <div>
                  <p className="font-medium">Classroom</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.classroom?.name || "—"}
                  </p>
                </div>

                {/* Assigned User */}
                <div>
                  <p className="font-medium">Assigned To</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.assignedUser?.name || "—"}
                  </p>
                </div>

                {/* Source */}
                <div>
                  <p className="font-medium">Source</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.source || "—"}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.status}
                  </p>
                </div>

                {/* Enquiry Date */}
                <div>
                  <p className="font-medium">Enquiry Date</p>
                  <p className="text-gray-600">
                    {new Date(selectedEnquiry.enquiryDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Next Follow-up */}
                <div>
                  <p className="font-medium">Next Follow-up</p>
                  <p className="text-gray-600">
                    {selectedEnquiry.nextFollowUpDate
                      ? new Date(
                        selectedEnquiry.nextFollowUpDate
                      ).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <p className="font-medium">Description</p>
                  <p className="mt-1 text-gray-600">
                    {selectedEnquiry.description || "—"}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.length == 0 && (
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
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(e)}
                      className="inline-flex items-center"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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
