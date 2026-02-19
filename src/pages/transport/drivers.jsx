import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getDrivers,getVehicles } from "@/store/slices/transportSlice";
import { selectDrivers } from "@/store/selectors/transportSelectors";
import { selectVehicles } from "@/store/selectors/transportSelectors";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";


const Drivers = () => {

  const dispatch = useDispatch();
  const drivers = useSelector(selectDrivers);
  const { loading, error } = useSelector((state) => state.transport);
  const vehicles = useSelector(selectVehicles);

  // ✅ Dialog Control State
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    licenseNumber: "",
    licenseExpiry: "",
    address: "",
    status: "ACTIVE",
    vehicleId: ""
  });

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getVehicles()); // ✅ Fetch vehicles for dropdown
  }, [dispatch]);

  // ✅ Handle Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const payload = {
      ...formData,
      vehicleId: Number(formData.vehicleId),
      licenseExpiry: new Date(formData.licenseExpiry).toISOString()
    };

    await dispatch(createDriver(payload)).unwrap();

    dispatch(getDrivers());

    toast({
      title: "Success",
      description: "Driver added successfully",
    });

    setOpen(false); // ✅ Close Modal

    setFormData({   // ✅ Reset Form
      fullName: "",
      phone: "",
      licenseNumber: "",
      licenseExpiry: "",
      address: "",
      status: "ACTIVE",
      vehicleId: ""
    });

  } catch (error) {

    toast({
      title: "Error",
      description: error?.message || "Failed to add driver",
      variant: "destructive",
    });

  } finally {
    // Optionally close modal on error too (remove this if you want it to stay open on error)
    // setOpen(false);
  }
};


  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Driver Management
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              Add Driver
            </Button>
          </DialogTrigger>

          {/* Modal */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Driver</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">License Number</label>
                <Input
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">License Expiry</label>
                <Input
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      licenseExpiry: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Vehicle</label>

                <Select
                  value={String(formData.vehicleId)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vehicleId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles?.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                        {vehicle.vehicleNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>


                {/* <Input
                  type="number"
                  value={formData.vehicleId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleId: e.target.value
                    })
                  }
                  required
                /> */}
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>

            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading Drivers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {drivers?.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.fullName}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>
                  {new Date(driver.licenseExpiry).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      driver.status === "ACTIVE"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>{driver.vehicleId}</TableCell>
                <TableCell>{driver.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </div>
  );
};

export default Drivers;
