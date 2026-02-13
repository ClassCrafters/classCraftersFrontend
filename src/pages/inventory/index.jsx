import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Loader2, Trash2, Edit3 } from "lucide-react";

import {
    createInventory,
    getInventories,
    updateInventory,
    deleteInventory,
} from "@/store/slices/inventorySlice";

import {
    selectInventories,
    selectInventoriesLoading,
    selectInventoriesError,
} from "@/store/selectors/inventorySelectors";

const Inventory = () => {
    const dispatch = useDispatch();
    const inventories = useSelector(selectInventories) || [];
    console.log("Inventories:", inventories);
    const loading = useSelector(selectInventoriesLoading);
    const error = useSelector(selectInventoriesError);

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [form, setForm] = useState({
        name: "",
        sku: "",
        category: "",
        quantity: "",
        description: "",
        purchaseDate: "",
        purchasePrice: "",
        vendor: "",
        institutionId: "",
    });
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        dispatch(getInventories());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await dispatch(
            createInventory({
                name: form.name,
                sku: form.sku,
                category: form.category,
                description: form.description,
                quantity: Number(form.quantity || 0),
                purchaseDate: form.purchaseDate ? new Date(form.purchaseDate).toISOString() : undefined,
                purchasePrice: Number(form.purchasePrice || 0),
                vendor: form.vendor,
                institutionId: form.institutionId ? Number(form.institutionId) : undefined,
            })
        );
        setForm({ name: "", sku: "", category: "", quantity: "", description: "", purchaseDate: "", purchasePrice: "", vendor: "", institutionId: "" });
        setOpenCreate(false);
        dispatch(getInventories());
    };

    const openEditFor = (item) => {
        setEditing(item);
        setForm({
            name: item.name || "",
            sku: item.sku || "",
            category: item.category || "",
            quantity: item.quantity != null ? String(item.quantity) : "",
            description: item.description || "",
            purchaseDate: item.purchaseDate ? item.purchaseDate.slice(0, 10) : "",
            purchasePrice: item.purchasePrice != null ? String(item.purchasePrice) : "",
            vendor: item.vendor || "",
            institutionId: item.institutionId != null ? String(item.institutionId) : "",
        });
        setOpenEdit(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editing) return;
        await dispatch(
            updateInventory({
                id: editing.id,
                name: form.name,
                sku: form.sku,
                category: form.category,
                description: form.description,
                quantity: Number(form.quantity || 0),
                purchaseDate: form.purchaseDate ? new Date(form.purchaseDate).toISOString() : undefined,
                purchasePrice: Number(form.purchasePrice || 0),
                vendor: form.vendor,
                institutionId: form.institutionId ? Number(form.institutionId) : undefined,
            })
        );
        setOpenEdit(false);
        setEditing(null);
        setForm({ name: "", sku: "", category: "", quantity: "", description: "", purchaseDate: "", purchasePrice: "", vendor: "", institutionId: "" });
        dispatch(getInventories());
    };

    const handleDelete = (id) => {
        if (!confirm("Delete this inventory item?")) return;
        dispatch(deleteInventory(id));
        setTimeout(() => dispatch(getInventories()), 300);
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="rounded-2xl shadow-md">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold">📦 Inventory</CardTitle>

                    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl">➕ Add Item</Button>
                        </DialogTrigger>

                        <DialogContent className="rounded-2xl">
                            <DialogHeader>
                                <DialogTitle>Create Inventory Item</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>SKU</Label>
                                    <Input name="sku" value={form.sku} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input name="category" value={form.category} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Input name="description" value={form.description} onChange={handleChange} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Purchase Date</Label>
                                        <Input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Purchase Price</Label>
                                        <Input type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Vendor</Label>
                                        <Input name="vendor" value={form.vendor} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Institution ID</Label>
                                    <Input type="number" name="institutionId" value={form.institutionId} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Quantity</Label>
                                    <Input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
                                </div>
                                <Button type="submit" className="w-full rounded-2xl">Create</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {loading && (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading inventories...
                        </div>
                    )}

                    {error && <div className="text-red-500 text-center py-4">{String(error)}</div>}

                    {!loading && inventories?.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Purchase Date</TableHead>
                                    <TableHead>Purchase Price</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventories.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.sku ?? "-"}</TableCell>
                                        <TableCell>{item.category ?? "-"}</TableCell>
                                        <TableCell>{item.description ?? "-"}</TableCell>
                                        <TableCell>{item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : "-"}</TableCell>
                                        <TableCell>{item.purchasePrice != null ? item.purchasePrice : "-"}</TableCell>
                                        <TableCell>{item.vendor ?? "-"}</TableCell>
                                        <TableCell>{item.quantity ?? "-"}</TableCell>
                                        <TableCell>{item.available ?? "-"}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="mr-2" onClick={() => openEditFor(item)}>
                                                <Edit3 className="h-4 w-4 mr-1" /> Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {!loading && inventories?.length === 0 && (
                        <div className="text-center py-10 text-gray-500">No inventory items.</div>
                    )}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Inventory Item</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label>SKU</Label>
                            <Input name="sku" value={form.sku} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input name="category" value={form.category} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input name="description" value={form.description} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Purchase Date</Label>
                                <Input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Purchase Price</Label>
                                <Input type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Vendor</Label>
                                <Input name="vendor" value={form.vendor} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Institution ID</Label>
                            <Input type="number" name="institutionId" value={form.institutionId} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" className="rounded-2xl">Update</Button>
                            <Button variant="outline" onClick={() => { setOpenEdit(false); setEditing(null); }}>Cancel</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Inventory;