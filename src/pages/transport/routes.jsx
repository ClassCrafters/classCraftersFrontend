import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoute, getRoutes, getVehicles } from "@/store/slices/transportSlice";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { selectVehicles } from "@/store/selectors/transportSelectors";


const RoutesPage = () => {

  const dispatch = useDispatch();
  const { routes, loading, error } = useSelector((state) => state.transport);
  const vehicles = useSelector(selectVehicles);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    routeName: "",
    startPoint: "",
    endPoint: "",
    distanceKm: "",
    vehicleId: ""
  });

  useEffect(() => {
    dispatch(getRoutes());
    dispatch(getVehicles()); // ✅ Fetch vehicles for dropdown
  }, [dispatch]);

  // ✅ Handle Submit with Try Catch + Toast
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        ...formData,
        distanceKm: Number(formData.distanceKm),
        vehicleId: Number(formData.vehicleId)
      };

      await dispatch(createRoute(payload)).unwrap();

      dispatch(getRoutes());

      toast({
        title: "Success",
        description: "Route added successfully 🚌",
      });

      (false);

      setFormData({
        routeName: "",
        startPoint: "",
        endPoint: "",
        distanceKm: "",
        vehicleId: ""
      });

    } catch (error) {

      toast({
        title: "Error",
        description: error?.message || "Failed to add route",
        variant: "destructive",
      });

    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Route Management
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              Add Route
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Route</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className="text-sm font-medium">Route Name</label>
                <Input
                  value={formData.routeName}
                  onChange={(e) =>
                    setFormData({ ...formData, routeName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Start Point</label>
                <Input
                  value={formData.startPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, startPoint: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">End Point</label>
                <Input
                  value={formData.endPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, endPoint: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Distance (Km)</label>
                <Input
                  type="number"
                  value={formData.distanceKm}
                  onChange={(e) =>
                    setFormData({ ...formData, distanceKm: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Vehicle</label>
                <Select
                  value={String(formData.vehicleId)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vehicleId: value })
                  }
                  required
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
        <p>Loading Routes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Vehicle</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {routes?.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.routeName}</TableCell>
                <TableCell>{route.startPoint}</TableCell>
                <TableCell>{route.endPoint}</TableCell>
                <TableCell>{route.distanceKm} Km</TableCell>
                <TableCell>{route.vehicleId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </div>
  );
};

export default RoutesPage;
