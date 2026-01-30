import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "@/store/slices/studentSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* 🔁 Initial state for reset */
const initialFormData = {
  student: {
    admissionNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
  },
  parent: {
    guardianName: "",
    phone: "",
  },
  registration: {
    academic_sessionId: "",
    classroom_id: "",
    section_id: "",
    rollNumber: "",
    user_id: "",
    institution_id: "",
    phase_id: "",
    subgroup_id: "",
    status: "",
  },
};

const Admission = () => {
  const dispatch = useDispatch();

  /* ⏳ Redux loading state */
  const loading = useSelector(
    (state) => state.student.status === "loading"
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(addStudent(formData));

    /* ✅ SUCCESS */
    if (addStudent.fulfilled.match(resultAction)) {
      toast.success("Admission successful 🎉", {
        description: "Student registered successfully",
      });

      setFormData(initialFormData); // reset form
    }

    /* ❌ ERROR */
    if (addStudent.rejected.match(resultAction)) {
      toast.error("Registration failed ❌", {
        description:
          resultAction.payload?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Student Admission</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* STUDENT DETAILS */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Student Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Admission No</Label>
                  <Input
                    value={formData.student.admissionNo}
                    onChange={(e) =>
                      handleChange("student", "admissionNo", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>First Name</Label>
                  <Input
                    value={formData.student.firstName}
                    onChange={(e) =>
                      handleChange("student", "firstName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={formData.student.lastName}
                    onChange={(e) =>
                      handleChange("student", "lastName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select
                    value={formData.student.gender}
                    onValueChange={(value) =>
                      handleChange("student", "gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.student.dob}
                    onChange={(e) =>
                      handleChange("student", "dob", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Blood Group</Label>
                  <Input
                    value={formData.student.bloodGroup}
                    onChange={(e) =>
                      handleChange("student", "bloodGroup", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.student.email}
                    onChange={(e) =>
                      handleChange("student", "email", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.student.phone}
                    onChange={(e) =>
                      handleChange("student", "phone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Address</Label>
                <Textarea
                  value={formData.student.address}
                  onChange={(e) =>
                    handleChange("student", "address", e.target.value)
                  }
                />
              </div>
            </section>

            {/* REGISTRATION */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Registration</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Academic Session ID"
                  value={formData.registration.academic_sessionId}
                  onChange={(e) =>
                    handleChange("registration", "academic_sessionId", e.target.value)
                  }
                />

                <Input
                  placeholder="Class ID"
                  value={formData.registration.classroom_id}
                  onChange={(e) =>
                    handleChange("registration", "classroom_id", e.target.value)
                  }
                />

                <Input
                  placeholder="Section ID"
                  value={formData.registration.section_id}
                  onChange={(e) =>
                    handleChange("registration", "section_id", e.target.value)
                  }
                />

                <Input
                  placeholder="Roll Number"
                  value={formData.registration.rollNumber}
                  onChange={(e) =>
                    handleChange("registration", "rollNumber", e.target.value)
                  }
                />

                <Input
                  placeholder="User ID"
                  value={formData.registration.user_id}
                  onChange={(e) =>
                    handleChange("registration", "user_id", e.target.value)
                  }
                />

                <Input
                  placeholder="Institution ID"
                  value={formData.registration.institution_id}
                  onChange={(e) =>
                    handleChange("registration", "institution_id", e.target.value)
                  }
                />

                <Input
                  placeholder="Phase ID"
                  value={formData.registration.phase_id}
                  onChange={(e) =>
                    handleChange("registration", "phase_id", e.target.value)
                  }
                />

                <Input
                  placeholder="Subgroup ID"
                  value={formData.registration.subgroup_id}
                  onChange={(e) =>
                    handleChange("registration", "subgroup_id", e.target.value)
                  }
                />

                <Select
                  value={formData.registration.status}
                  onValueChange={(value) =>
                    handleChange("registration", "status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="px-8">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Admission"
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admission;
