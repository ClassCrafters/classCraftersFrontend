import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles, deleteVehicle, createVehicle } from "../../store/slices/transportSlice";
import { selectVehicles } from "../../store/selectors/transportSelectors";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const { loading } = useSelector((state) => state.transport);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    type: "",
    capacity: "",
    model: "",
    insuranceNumber: "",
    insuranceExpiry: "",
    fitnessExpiry: "",
  });

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(createVehicle(formData));
    setOpen(false);
    setFormData({
      vehicleNumber: "",
      type: "",
      capacity: "",
      model: "",
      insuranceNumber: "",
      insuranceExpiry: "",
      fitnessExpiry: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transport Vehicles</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Vehicle</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">

              {/* Vehicle Number */}
              <div className="space-y-2">
                <Label>Vehicle Number</Label>
                <Input
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="OD-02-AB-1234"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUS">Bus</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                    <SelectItem value="MINI_BUS">Mini Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="45"
                />
              </div>

              {/* Model */}
              <div className="space-y-2">
                <Label>Model</Label>
                <Input
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="Tata Starbus"
                />
              </div>

              {/* Insurance Number */}
              <div className="space-y-2">
                <Label>Insurance Number</Label>
                <Input
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Insurance Expiry */}
              <div className="space-y-2">
                <Label>Insurance Expiry</Label>
                <Input
                  type="date"
                  name="insuranceExpiry"
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                />
              </div>

              {/* Fitness Expiry */}
              <div className="space-y-2">
                <Label>Fitness Expiry</Label>
                <Input
                  type="date"
                  name="fitnessExpiry"
                  value={formData.fitnessExpiry}
                  onChange={handleChange}
                />
              </div>

              <Button
                className="w-full mt-4"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Create Vehicle"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vehicles List Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Vehicle List</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles?.length === 0 ? (
            <p className="text-muted-foreground">No vehicles found.</p>
          ) : (
            vehicles?.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium">{vehicle.vehicleNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.type} • {vehicle.capacity} Seats
                  </p>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(deleteVehicle(vehicle.id))}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Vehicles;
