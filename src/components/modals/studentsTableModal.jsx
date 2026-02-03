import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentsTable = ({ classroom }) => {
  const students = classroom?.student || [];

  if (!students.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No students found in this classroom.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Roll No</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Blood Group</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.rollNumber}
              </TableCell>

              <TableCell>
                {item.student.firstName} {item.student.lastName}
              </TableCell>

              <TableCell>{item.student.gender}</TableCell>

              <TableCell>{item.student.email}</TableCell>

              <TableCell>
                {new Date(item.student.dob).toLocaleDateString()}
              </TableCell>

              <TableCell>{item.student.bloodGroup}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
