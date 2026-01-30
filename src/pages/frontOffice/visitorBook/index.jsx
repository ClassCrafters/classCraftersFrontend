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
import { AlertCircle, LogOut, Plus, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  createVisitorEntry,
  getAllVisitorEntries,
  getActiveVisitorEntries,
  getvisitorTodayEntries,
  visitorExit,
} from "@/store/slices/frontOfficeSlice";

import {
  selectVisitorBook,
  selectVisitorBookLoading,
  selectVisitorBookError,
} from "@/store/selectors/frontOfficeSelectors";

const VisitorBook = () => {
  const dispatch = useDispatch();
  const visitorBook = useSelector(selectVisitorBook);
//   console.log("Visitor Book Data:", visitorBook);
  const loading = useSelector(selectVisitorBookLoading);
  const error = useSelector(selectVisitorBookError);

  const { register, handleSubmit, reset, setValue } = useForm();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================
     INITIAL LOAD
  ======================== */
  useEffect(() => {
    dispatch(getAllVisitorEntries());
  }, [dispatch]);

  /* =======================
     CREATE VISITOR ENTRY
  ======================== */
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Convert datetime-local format to ISO-8601 format
    const convertDateTimeToISO = (dateTimeLocal) => {
      if (!dateTimeLocal) return new Date().toISOString();
      const date = new Date(dateTimeLocal);
      return date.toISOString();
    };

    const convertedData = {
      visitorName: data.visitorName,
      phone: data.phone,
      purpose: data.purpose,
      meetingWith: data.meetingWith,
      idCard: data.idCard,
      numberOfPerson: Number(data.numberOfPerson) || 1,
      note: data.note,
      date: convertDateTimeToISO(data.date),
      inTime: convertDateTimeToISO(data.inTime),
    };
    dispatch(createVisitorEntry(convertedData)).then((result) => {
      setIsSubmitting(false);
      if (result.type === "frontOffice/createVisitorEntry/fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Visitor entry created successfully",
          confirmButtonText: "OK",
        }).then(() => {
          reset();
          setIsFormOpen(false);
          dispatch(getAllVisitorEntries());
        });
      } else if (result.type === "frontOffice/createVisitorEntry/rejected") {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.payload?.message || "Failed to create visitor entry",
          confirmButtonText: "OK",
        });
      }
    });
  };

  /* =======================
     HANDLE EXIT VISITOR
  ======================== */
  const handleVisitorExit = (visitorId) => {
    Swal.fire({
      title: "Confirm Exit",
      text: "Are you sure you want to mark this visitor as exited?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Exit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          visitorExit({
            visitorId,
            exitData: { checkOutTime: new Date().toISOString() },
          })
        ).then((result) => {
          if (result.type === "frontOffice/visitorExit/fulfilled") {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Visitor marked as exited",
              confirmButtonText: "OK",
            }).then(() => {
              dispatch(getAllVisitorEntries());
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to exit visitor",
              confirmButtonText: "OK",
            });
          }
        });
      }
    });
  };

  /* =======================
     APPLY FILTER
  ======================== */
  const applyFilter = () => {
    if (filterType === "today") {
      dispatch(getvisitorTodayEntries());
    } else if (filterType === "active") {
      dispatch(getActiveVisitorEntries());
    } else {
      dispatch(getAllVisitorEntries());
    }
  };

  const resetFilter = () => {
    setFilterType("all");
    dispatch(getAllVisitorEntries());
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Visitor Book</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Visitor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Visitor</DialogTitle>
              <DialogDescription>
                Fill in the form below to register a new visitor entry
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Input
                placeholder="Visitor Name"
                {...register("visitorName", { required: "Visitor name is required" })}
              />
              <Input
                placeholder="Phone"
                type="tel"
                {...register("phone", { required: "Phone is required" })}
              />
              <Input
                placeholder="Purpose of Visit"
                {...register("purpose", { required: "Purpose is required" })}
              />
              <Select onValueChange={(v) => setValue("meetingWith", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Meeting With" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
                  <SelectItem value="PRINCIPAL">Principal</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(v) => setValue("idCard", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="ID Card Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aadhaar">Aadhaar</SelectItem>
                  <SelectItem value="PAN">PAN</SelectItem>
                  <SelectItem value="DrivingLicense">Driving License</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="VoterId">Voter ID</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Number of Persons"
                type="number"
                min="1"
                defaultValue="1"
                {...register("numberOfPerson", { required: true })}
              />
              <Input
                placeholder="Visit Date"
                type="datetime-local"
                {...register("date")}
              />
              <Input
                placeholder="Check-in Time"
                type="datetime-local"
                {...register("inTime")}
              />
              <Textarea
                placeholder="Additional Notes"
                {...register("note")}
                className="md:col-span-2"
              />

              <div className="md:col-span-2 flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    reset();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Register Visitor"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || "An error occurred while loading visitor data"}
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center flex-wrap">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visitors</SelectItem>
                <SelectItem value="today">Today's Visitors</SelectItem>
                <SelectItem value="active">Active Visitors</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={applyFilter} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Apply Filter
            </Button>

            <Button
              onClick={resetFilter}
              variant="ghost"
              className="text-gray-600"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visitors Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Visitor Records ({visitorBook?.data?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading && (
              <div className="text-center py-8 text-gray-500">
                Loading visitor data...
              </div>
            )}

            {!loading && visitorBook?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No visitor records found
              </div>
            )}

            {!loading && visitorBook?.data?.length > 0 && (
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Purpose</TableHead>
                    <TableHead className="font-semibold">Meeting With</TableHead>
                    <TableHead className="font-semibold">ID Type</TableHead>
                    <TableHead className="font-semibold">Persons</TableHead>
                    <TableHead className="font-semibold">Check-in Time</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitorBook?.data?.map((visitor) => (
                    <TableRow key={visitor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {visitor.visitorName}
                      </TableCell>
                      <TableCell>{visitor.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{visitor.purpose}</Badge>
                      </TableCell>
                      <TableCell>{visitor.meetingWith || "-"}</TableCell>
                      <TableCell>{visitor.idCard || "-"}</TableCell>
                      <TableCell>{visitor.numberOfPerson || 1}</TableCell>
                      <TableCell>
                        {visitor.inTime
                          ? new Date(visitor.inTime).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            visitor.status === "ACTIVE"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {visitor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {visitor.status === "ACTIVE" && (
                          <Button
                            onClick={() => handleVisitorExit(visitor.id)}
                            size="sm"
                            variant="destructive"
                            className="gap-2"
                          >
                            <LogOut className="w-3 h-3" />
                            Exit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{visitorBook?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Currently Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-3xl font-bold text-green-600">
              {visitorBook?.filter((v) => v.status === "ACTIVE").length || 0}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Checked Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-3xl font-bold text-blue-600">
              {visitorBook?.filter((v) => v.status === "EXITED").length || 0}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorBook;

