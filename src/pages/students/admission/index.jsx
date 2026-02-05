import React, { use, useState, useEffect } from "react";
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

import { selectClassrooms } from "../../../store/selectors/classRoomSelectors";
import { selectPhases } from "../../../store/selectors/phaseSelectors";
import { selectSubGroups } from "../../../store/selectors/subGroupSelectors";
import { selectInstitutions } from "../../../store/selectors/institutionSelectors";
import { selectUser } from "../../../store/selectors/userSelectors";


import { getClassroom } from "../../../store/slices/classRoomSlice";
import { fetchPhases } from "../../../store/slices/phaseSlice";
import { fetchSubGroups } from "../../../store/slices/subGroupSlice";
import { fetchInstitutions } from "../../../store/slices/institutionSlice";
import { fetchAllUser } from "../../../store/slices/userSlice";


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
  const classrooms = useSelector(selectClassrooms);
  const phases = useSelector(selectPhases);
  const subGroups = useSelector(selectSubGroups);
  const institutions = useSelector(selectInstitutions);
  const users = useSelector(selectUser);

  const academicSessions = [
    { id: 1, name: "2026–2027" }
  ];

  const sections = [
    { id: 1, name: "Section A" },
    { id: 2, name: "Section B" },
    { id: 3, name: "Section C" },
  ];

  useEffect(() => {
    dispatch(getClassroom());
    dispatch(fetchPhases());
    dispatch(fetchSubGroups());
    dispatch(fetchInstitutions());
    dispatch(fetchAllUser());
  }, [dispatch]);


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

    try {
      await dispatch(addStudent(formData)).unwrap();

      toast.success("Admission successful 🎉", {
        description: "Student registered successfully",
      });

      alert("Student registered successfully ✅"); // 👈 ALERT

      setFormData(initialFormData);
    } catch (error) {
      toast.error("Registration failed ❌", {
        description: error?.message || "Something went wrong",
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

            <section>
              <h2 className="text-lg font-semibold mb-4">Parent</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Guardian Name"
                  value={formData.parent.guardianName}
                  onChange={(e) =>
                    handleChange("parent", "guardianName", e.target.value)
                  }
                />

                <Input
                  placeholder="Phone"
                  value={formData.parent.phone}
                  onChange={(e) =>
                    handleChange("parent", "phone", e.target.value)
                  }
                />
              </div>
            </section>

            {/* REGISTRATION */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Registration</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Academic Session ID (if static, keep input) */}
                <Select
                  value={String(formData.registration.academic_sessionId)}
                  onValueChange={(value) =>
                    handleChange(
                      "registration",
                      "academic_sessionId",
                      Number(value) // ✅ send ID as number
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Academic Session" />
                  </SelectTrigger>

                  <SelectContent>
                    {academicSessions.map((session) => (
                      <SelectItem key={session.id} value={String(session.id)}>
                        {session.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Classroom */}
                <Select
                  value={String(formData.registration.classroom_id || "")}
                  onValueChange={(value) =>
                    handleChange("registration", "classroom_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms?.map((cls) => (
                      <SelectItem key={cls.id} value={String(cls.id)}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Section (if you don’t have section selector, keep input) */}
                <Select
                  value={String(formData.registration.section_id)}
                  onValueChange={(value) =>
                    handleChange(
                      "registration",
                      "section_id",
                      Number(value) // ✅ send ID
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>

                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={String(section.id)}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Roll Number */}
                <Input
                  placeholder="Roll Number"
                  value={formData.registration.rollNumber}
                  onChange={(e) =>
                    handleChange("registration", "rollNumber", e.target.value)
                  }
                />

                {/* User */}
                <Select
                  value={String(formData.registration.user_id || "")}
                  onValueChange={(value) =>
                    handleChange("registration", "user_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.data?.users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Institution */}
                <Select
                  value={String(formData.registration.institution_id || "")}
                  onValueChange={(value) =>
                    handleChange("registration", "institution_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions?.map((inst) => (
                      <SelectItem key={inst.id} value={String(inst.id)}>
                        {inst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Phase */}
                <Select
                  value={String(formData.registration.phase_id || "")}
                  onValueChange={(value) =>
                    handleChange("registration", "phase_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    {phases?.map((phase) => (
                      <SelectItem key={phase.id} value={String(phase.id)}>
                        {phase.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Subgroup */}
                <Select
                  value={String(formData.registration.subgroup_id || "")}
                  onValueChange={(value) =>
                    handleChange("registration", "subgroup_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subgroup" />
                  </SelectTrigger>
                  <SelectContent>
                    {subGroups?.map((group) => (
                      <SelectItem key={group.id} value={String(group.id)}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status */}
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
