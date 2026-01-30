import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LeaveManagement() {
  return (
    <div className="p-6">
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Add Leave</h1>

          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Class *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Section *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Student *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">Student 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Apply Date *</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>From Date *</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>To Date *</Label>
              <Input type="date" />
            </div>
          </div>

          {/* Reason */}
          <div>
            <Label>Reason</Label>
            <Textarea placeholder="Enter reason..." />
          </div>

          {/* Leave Status */}
          <div>
            <Label>Leave Status *</Label>
            <RadioGroup defaultValue="pending" className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="disapprove" id="disapprove" />
                <Label htmlFor="disapprove">Disapprove</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve">Approve</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File Upload */}
          <div>
            <Label>Attach Document</Label>
            <Input type="file" className="mt-2" />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="px-8">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

