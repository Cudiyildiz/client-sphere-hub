
import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Edit, Trash, Star, CheckCircle } from 'lucide-react';
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

// Sample brand data
const initialBrands = [
  { id: 1, name: 'Acme Inc.', industry: 'Technology', plan: 'Premium', customers: 1240, status: 'Active' },
  { id: 2, name: 'Global Foods', industry: 'Food & Beverage', plan: 'Premium', customers: 856, status: 'Active' },
  { id: 3, name: 'Tech Solutions', industry: 'Software', plan: 'Standard', customers: 614, status: 'Active' },
  { id: 4, name: 'Urban Fashion', industry: 'Retail', plan: 'Basic', customers: 325, status: 'Active' },
  { id: 5, name: 'Health Plus', industry: 'Healthcare', plan: 'Standard', customers: 428, status: 'Inactive' },
];

// Form schema
const brandFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  industry: z.string().min(1, { message: 'Industry is required' }),
  plan: z.enum(['Basic', 'Standard', 'Premium']),
  status: z.enum(['Active', 'Inactive']),
});

type BrandFormValues = z.infer<typeof brandFormSchema>;

const BrandManagement: React.FC = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const { toast } = useToast();

  // Form setup
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: '',
      industry: '',
      plan: 'Standard',
      status: 'Active',
    },
  });

  // Filter brands based on search query
  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding new brand
  const onSubmit = (values: BrandFormValues) => {
    if (editingBrand) {
      // Update existing brand
      setBrands(
        brands.map((b) =>
          b.id === editingBrand.id
            ? { ...b, ...values }
            : b
        )
      );
      toast({
        title: 'Brand updated',
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new brand
      setBrands([
        ...brands,
        {
          id: brands.length + 1,
          ...values,
          customers: 0,
        },
      ]);
      toast({
        title: 'Brand added',
        description: `${values.name} has been added successfully.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingBrand(null);
    form.reset();
  };

  // Handle edit brand
  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    form.reset({
      name: brand.name,
      industry: brand.industry,
      plan: brand.plan,
      status: brand.status,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete brand
  const handleDelete = (id: number) => {
    setBrands(brands.filter((b) => b.id !== id));
    toast({
      title: 'Brand removed',
      description: 'The brand has been removed successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Brand Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingBrand(null);
              form.reset({
                name: '',
                industry: '',
                plan: 'Standard',
                status: 'Active',
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
              <DialogDescription>
                {editingBrand 
                  ? 'Update the brand information below.' 
                  : 'Fill in the information below to add a new brand.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter industry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Basic">Basic</option>
                          <option value="Standard">Standard</option>
                          <option value="Premium">Premium</option>
                        </select>
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
                  <Button type="submit">{editingBrand ? 'Update' : 'Add'} Brand</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search brands..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Customers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.industry}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {brand.plan === 'Premium' && <Star className="mr-1 h-4 w-4 text-amber-500" />}
                      {brand.plan}
                    </div>
                  </TableCell>
                  <TableCell>{brand.customers}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        brand.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <CheckCircle className={`mr-1 h-3 w-3 ${
                        brand.status === 'Active' ? 'text-green-500' : 'text-gray-500'
                      }`} />
                      {brand.status}
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
                        <DropdownMenuItem onClick={() => handleEdit(brand)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(brand.id)}>
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
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BrandManagement;
