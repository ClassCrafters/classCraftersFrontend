import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Menu,
    Car,
    Users,
    Library,
    Receipt,
    School
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

const AppMenuModal = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const routes = [

        {
            group: "Transport",
            items: [
                { label: "Vehicles", icon: <Car />, href: "/transport/vehicles" },
                { label: "Drivers", icon: <Users />, href: "/transport/drivers" },
                { label: "Routes", icon: <Car />, href: "/transport/routes" },
                { label: "Add Stop", icon: <Car />, href: "/transport/add-stop" },
                { label: "Assign Student", icon: <Users />, href: "/assign-student-transport" }
            ]
        },

        {
            group: "Students",
            items: [
                { label: "Student List", icon: <Users />, href: "/students/list" },
                { label: "Admission", icon: <School />, href: "/students/admission" },
                { label: "Attendance", icon: <Users />, href: "/students/attendance" }
            ]
        },

        {
            group: "Library",
            items: [
                { label: "Library", icon: <Library />, href: "/library" },
                { label: "Book List", icon: <Library />, href: "/library/booklist" },
                { label: "Issue Return", icon: <Library />, href: "/library/issue-return" }
            ]
        },

        {
            group: "Payment",
            items: [
                { label: "Collect Fees", icon: <Receipt />, href: "/payment/collect-fees" },
                { label: "Assign Fees", icon: <Receipt />, href: "/payment/assign-fees" },
                { label: "Payments", icon: <Receipt />, href: "/payment/payments" }
            ]
        },

    ];

    const handleNavigate = (href) => {
        navigate(href);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </DialogTrigger>

            {/* GRID MODAL */}
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">

                <div className="space-y-6">

                    {routes.map((group, i) => (

                        <div key={i}>
                            <h2 className="text-lg font-semibold mb-3">
                                {group.group}
                            </h2>

                            {/* GRID */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                                {group.items.map((item, j) => (
                                    <div
                                        key={j}
                                        onClick={() => handleNavigate(item.href)}
                                        className="flex flex-col items-center justify-center gap-2 p-4 border rounded-xl hover:bg-muted cursor-pointer transition shadow-sm"
                                    >
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm text-center">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}

                            </div>
                        </div>

                    ))}

                </div>

            </DialogContent>
        </Dialog>
    );
};

export default AppMenuModal;
