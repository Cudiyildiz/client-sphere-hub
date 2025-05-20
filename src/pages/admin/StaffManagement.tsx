
import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

// Sample staff data
const initialStaff = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Senior Manager', assignedBrands: 8, status: 'Active' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Account Manager', assignedBrands: 5, status: 'Active' },
  { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'Support Specialist', assignedBrands: 12, status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Account Manager', assignedBrands: 7, status: 'Active' },
  { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'Support Specialist', assignedBrands: 10, status: 'Inactive' },
];

// Form schema
const staffFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.string().min(1, { message: 'Role is required' }),
  status: z.enum(['Active', 'Inactive']),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const { toast } = useToast();

  // Form setup
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      status: 'Active',
    },
  });

  // Filter staff based on search query
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding new staff
  const onSubmit = (values: StaffFormValues) => {
    if (editingStaff) {
      // Update existing staff
      setStaff(
        staff.map((s) =>
          s.id === editingStaff.id
            ? { ...s, ...values }
            : s
        )
      );
      toast({
        title: 'Staff updated',
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new staff
      setStaff([
        ...staff,
        {
          id: staff.length + 1,
          ...values,
          assignedBrands: 0,
        },
      ]);
      toast({
        title: 'Staff added',
        description: `${values.name} has been added successfully.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingStaff(null);
    form.reset();
  };

  // Handle edit staff
  const handleEdit = (staffMember: any) => {
    setEditingStaff(staffMember);
    form.reset({
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
      status: staffMember.status,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete staff
  const handleDelete = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast({
      title: 'Staff removed',
      description: 'The staff member has been removed successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingStaff(null);
              form.reset({
                name: '',
                email: '',
                role: '',
                status: 'Active',
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Staff' : 'Add New Staff'}</DialogTitle>
              <DialogDescription>
                {editingStaff 
                  ? 'Update the staff member information below.' 
                  : 'Fill in the information below to add a new staff member.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter staff name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingStaff ? 'Update' : 'Add'} Staff</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search staff..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Assigned Brands</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell className="font-medium">{staffMember.name}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.role}</TableCell>
                  <TableCell>{staffMember.assignedBrands}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        staffMember.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {staffMember.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(staffMember)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(staffMember.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No staff found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffManagement;
