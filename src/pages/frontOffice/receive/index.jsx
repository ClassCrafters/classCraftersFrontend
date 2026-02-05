import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createReceivePostalEntry,
    getAllReceivePostalEntries,
    updateReceivePostalEntry,
    deleteReceivePostalEntry
} from '../../../store/slices/frontOfficeSlice';
import {
    selectReceivePostal,
    selectReceivePostalLoading,
    selectReceivePostalError
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
import { Trash2, Edit2, Plus, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const PostalReceive = () => {
    const dispatch = useDispatch();
    const postalsReceive = useSelector(selectReceivePostal);
    console.log("postal receive:", postalsReceive)
    const loading = useSelector(selectReceivePostalLoading);
    const error = useSelector(selectReceivePostalError);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        referenceNo: '',
        address: '',
        note: '',
        toTitle: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [openReceiveView, setOpenReceiveView] = useState(false);
    const [selectedReceive, setSelectedReceive] = useState(null);

    const handleReceiveView = (receive) => {
        setSelectedReceive(receive);
        setOpenReceiveView(true);
    };


    useEffect(() => {
        dispatch(getAllReceivePostalEntries());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Something went wrong');
        }
    }, [error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'referenceNo' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.referenceNo || !formData.address || !formData.toTitle) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            const submitData = {
                ...formData,
                date: new Date(formData.date).toISOString()
            };

            if (editingId) {
                await dispatch(updateReceivePostalEntry({
                    dispatchId: editingId,
                    updateData: submitData
                })).unwrap();
                toast.success('Dispatch updated successfully');
            } else {
                await dispatch(createReceivePostalEntry(submitData)).unwrap();
                toast.success('Dispatch created successfully');
            }

            setFormData({
                referenceNo: '',
                address: '',
                note: '',
                toTitle: '',
                date: new Date().toISOString().split('T')[0],
            });
            setEditingId(null);
            setOpen(false);
            dispatch(getAllReceivePostalEntries());
        } catch (err) {
            toast.error(err.message || 'Failed to save dispatch');
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            referenceNo: item.referenceNo || '',
            address: item.address || '',
            note: item.note || '',
            toTitle: item.toTitle || '',
            date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0],
        });
        
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteReceivePostalEntry(id)).unwrap();
            toast.success('Dispatch deleted successfully');
            dispatch(getAllDispatchEntries());
        } catch (err) {
            toast.error(err.message || 'Failed to delete dispatch');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        setFormData({
            referenceNo: '',
            address: '',
            note: '',
            toTitle: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className="w-full h-full p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Postal Receive Management</h1>
                        <p className="text-gray-600 text-sm md:text-base mt-1">Manage postal receives</p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto" onClick={() => setEditingId(null)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Receive Postal
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-md md:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingId ? 'Edit Dispatch' : 'Create New Dispatch'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Reference No <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        name="referenceNo"
                                        type="number"
                                        placeholder="Enter reference number"
                                        value={formData.referenceNo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        To Title <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        name="toTitle"
                                        placeholder="Enter sender name"
                                        value={formData.toTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        name="address"
                                        placeholder="Enter dispatch address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <Input
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notes
                                    </label>
                                    <Textarea
                                        name="note"
                                        placeholder="Add additional notes"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        rows={2}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClose}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingId ? 'Update' : 'Create'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Dialog open={openReceiveView} onOpenChange={setOpenReceiveView}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Receive Details</DialogTitle>
                            <DialogDescription>
                                Complete receive information
                            </DialogDescription>
                        </DialogHeader>

                        {selectedReceive && (
                            <div className="space-y-3 text-sm">
                                {/* Reference No */}
                                <div className="flex justify-between">
                                    <span className="font-medium">Reference No</span>
                                    <span className="text-gray-600">
                                        {selectedReceive.referenceNo}
                                    </span>
                                </div>

                                {/* To Title */}
                                <div className="flex justify-between">
                                    <span className="font-medium">To</span>
                                    <span className="text-gray-600">
                                        {selectedReceive.toTitle}
                                    </span>
                                </div>

                                {/* Address */}
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="mt-1 text-gray-600 whitespace-pre-line">
                                        {selectedReceive.address}
                                    </p>
                                </div>

                                {/* Note */}
                                <div>
                                    <p className="font-medium">Note</p>
                                    <p className="mt-1 text-gray-600 whitespace-pre-line">
                                        {selectedReceive.note || "—"}
                                    </p>
                                </div>

                                {/* Created At */}
                                <div className="flex justify-between pt-2 border-t">
                                    <span className="font-medium">Created At</span>
                                    <span className="text-gray-600">
                                        {new Date(selectedReceive.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


                {/* Table - Desktop View */}
                <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                    {loading && postalsReceive.length === 0 ? (
                        <div className="p-8 text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">Loading dispatches...</p>
                        </div>
                    ) : postalsReceive.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">No dispatches found. Create one to get started.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="font-semibold">Ref No</TableHead>
                                    <TableHead className="font-semibold">From</TableHead>
                                    <TableHead className="font-semibold">Address</TableHead>
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Notes</TableHead>
                                    <TableHead className="text-right font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {postalsReceive.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{item.referenceNo}</TableCell>
                                        <TableCell>{item.toTitle}</TableCell>
                                        <TableCell className="max-w-xs truncate">{item.address}</TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                        <TableCell className="max-w-xs truncate">{item.note}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleReceiveView(item)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(item)}
                                                className="inline-flex"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="inline-flex"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden space-y-3">
                    {loading && postalsReceive.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">Loading dispatches...</p>
                        </div>
                    ) : postalsReceive.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg">
                            <p className="text-gray-500">No dispatches found. Create one to get started.</p>
                        </div>
                    ) : (

                        postalsReceive.map((item) => (
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

export default PostalReceive;
