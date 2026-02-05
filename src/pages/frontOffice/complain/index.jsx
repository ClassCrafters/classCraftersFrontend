import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComplaintEntry,
    getAllComplaintEntries,
    getComplaintById,
    updateComplaintEntry,
    deleteComplaintEntry
} from '../../../store/slices/frontOfficeSlice';
import {
    selectComplaints,
    selectComplaintLoading,
    selectComplaintError
} from '../../../store/selectors/frontOfficeSelectors';
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Trash2, Edit2, Plus, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ComplainPage = () => {
    const dispatch = useDispatch();
    const complaints = useSelector(selectComplaints);
    const loading = useSelector(selectComplaintLoading);
    const error = useSelector(selectComplaintError);
    const [openView, setOpenView] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const handleView = (item) => {
        setSelectedComplaint(item);
        setOpenView(true);
    };

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        complaint: '',
        source: '',
        complainBy: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        actionTaken: '',
        assign: '',
        note: ''
    });

    useEffect(() => {
        dispatch(getAllComplaintEntries());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Something went wrong');
        }
    }, [error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.complaint || !formData.source || !formData.complainBy || !formData.phone || !formData.assign) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            const submitData = {
                ...formData,
                date: new Date(formData.date).toISOString()
            };

            if (editingId) {
                await dispatch(updateComplaintEntry({
                    dispatchId: editingId,
                    updateData: submitData
                })).unwrap();
                toast.success('Dispatch updated successfully');
            } else {
                await dispatch(createComplaintEntry(submitData)).unwrap();
                toast.success('Dispatch created successfully');
            }

            setFormData({
                complaint: '',
                source: '',
                complainBy: '',
                phone: '',
                date: new Date().toISOString().split('T')[0],
                description: '',
                actionTaken: '',
                assign: '',
                note: ''
            });
            setEditingId(null);
            setOpen(false);
            dispatch(getAllComplaintEntries());
        } catch (err) {
            toast.error(err.message || 'Failed to save dispatch');
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            complaint: item.complaint || '',
            source: item.source || '',
            complainBy: item.complainBy || '',
            phone: item.phone || '',
            description: item.description || '',
            actionTaken: item.actionTaken || '',
            assign: item.assign || '',
            note: item.note || '',
            date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0],
        });
        
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteComplaintEntry(id)).unwrap();
            toast.success('Dispatch deleted successfully');
            dispatch(getAllComplaintEntries());
        } catch (err) {
            toast.error(err.message || 'Failed to delete dispatch');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        setFormData({
            complaint: '',
            source: '',
            complainBy: '',
            phone: '',
            description: '',
            actionTaken: '',
            assign: '',
            note: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className="w-full h-full p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Complaint</h1>
                        <p className="text-gray-600 text-sm md:text-base mt-1">Manage Complaint</p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto" onClick={()=>{
                                setEditingId(null)
                                setOpen(true)
                            }}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Complaint
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-md md:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingId ? 'Edit Dispatch' : 'Create New Dispatch'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* BASIC INFO */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">Complaint *</label>
                                        <Select
                                            value={formData.complaint}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, complaint: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select complaint type" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="EXAMLEAK">Examleak</SelectItem>
                                                <SelectItem value="MISBEHAVE">Misbehavior</SelectItem>
                                                <SelectItem value="ABUSE">Abuse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="form-label">Source *</label>
                                        <Select
                                            value={formData.source}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, source: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select source" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="PARENT">Parent</SelectItem>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="STAFF">Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="form-label">Date</label>
                                        <Input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Phone</label>
                                        <Input
                                            name="phone"
                                            placeholder="10 digit mobile number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* PERSON */}
                                <div>
                                    <label className="form-label">Complain By *</label>
                                    <Input
                                        name="complainBy"
                                        placeholder="Name of complainant"
                                        value={formData.complainBy}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* ASSIGNMENT */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">Assign To *</label>
                                        <Select
                                            value={formData.assign}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, assign: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Assign to" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="ADMIN">Admin</SelectItem>
                                                <SelectItem value="TEACHER">Teacher</SelectItem>
                                                <SelectItem value="STAFF">Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="form-label">Action Taken</label>
                                        <Select
                                            value={formData.actionTaken}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, actionTaken: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select action status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="PENDING">Pending</SelectItem>
                                                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                                <SelectItem value="RESOLVED">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <label className="form-label">Description</label>
                                    <Textarea
                                        name="description"
                                        placeholder="Detailed description of the complaint"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>

                                {/* NOTE */}
                                <div>
                                    <label className="form-label">Internal Note</label>
                                    <Textarea
                                        name="note"
                                        placeholder="Only visible to admin"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        rows={2}
                                    />
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <Button type="button" variant="outline" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : editingId ? 'Update Complaint' : 'Create Complaint'}
                                    </Button>
                                </div>

                            </form>

                        </DialogContent>
                    </Dialog>
                </div>

                <Dialog open={openView} onOpenChange={setOpenView}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Complaint Details</DialogTitle>
                            <DialogDescription>
                                View complete complaint information
                            </DialogDescription>
                        </DialogHeader>

                        {selectedComplaint && (
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Assigned To:</span>
                                    <span>{selectedComplaint.assign}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Complaint By:</span>
                                    <span>{selectedComplaint.complainBy}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Source:</span>
                                    <span>{selectedComplaint.source}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Date:</span>
                                    <span>
                                        {new Date(selectedComplaint.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-medium">Complaint:</span>
                                    <p className="mt-1 text-gray-600">
                                        {selectedComplaint.complaint}
                                    </p>
                                </div>

                                <div>
                                    <span className="font-medium">Note:</span>
                                    <p className="mt-1 text-gray-600">
                                        {selectedComplaint.note || "—"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


                {/* Table - Desktop View */}
                <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                    {loading && complaints.length === 0 ? (
                        <div className="p-8 text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">Loading complaints...</p>
                        </div>
                    ) : complaints.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">No complaints found. Create one to get started.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="font-semibold">Assign To</TableHead>
                                    <TableHead className="font-semibold">Complain By</TableHead>
                                    <TableHead className="font-semibold">Complaint</TableHead>
                                    <TableHead className="font-semibold">Source</TableHead>
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Notes</TableHead>
                                    <TableHead className="text-right font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {complaints.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{item.assign}</TableCell>
                                        <TableCell>{item.complainBy}</TableCell>
                                        <TableCell className="max-w-xs truncate">{item.complaint}</TableCell>
                                        <TableCell className="max-w-xs truncate">{item.source}</TableCell>
                                        <TableCell>
                                            {new Date(item.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{item.note}</TableCell>

                                        {/* VIEW */}
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleView(item)}
                                                className="inline-flex items-center"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>

                                        {/* ACTIONS */}
                                        <TableCell className="space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(item)}
                                                className="inline-flex items-center"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="inline-flex items-center"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this complaint? This action cannot be undone.
                                                    </AlertDialogDescription>

                                                    <div className="flex gap-3 justify-end">
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(item.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </div>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    )}
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden space-y-3">
                    {loading && complaints.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">Loading dispatches...</p>
                        </div>
                    ) : complaints.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg">
                            <p className="text-gray-500">No dispatches found. Create one to get started.</p>
                        </div>
                    ) : (

                        complaints.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Ref: {item.referenceNo}</h3>
                                        <p className="text-sm text-gray-600">From: {item.toTitle}</p>
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {new Date(item.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="mb-3 space-y-2">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Address:</span> {item.address}
                                    </p>
                                    {item.note && (
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Notes:</span> {item.note}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(item)}
                                        className="flex-1"
                                    >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="flex-1"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle>Delete Dispatch</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete this dispatch? This action cannot be undone.
                                            </AlertDialogDescription>
                                            <div className="flex gap-3">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplainPage;
