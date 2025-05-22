
import React, { useState } from 'react';
import { Edit, Trash, Check, CreditCard, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Subscription plan types
interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  billingCycle: 'Monthly' | 'Yearly';
  features: string[];
  maxBrands: number;
  active: boolean;
}

// Payment history type
interface PaymentHistory {
  id: number;
  brandName: string;
  plan: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Failed' | 'Refunded';
}

// Sample subscription plans
const initialPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Easy Plan',
    price: 49,
    billingCycle: 'Monthly',
    features: ['Basic customer management', 'Up to 1000 customers', 'Email support'],
    maxBrands: 1,
    active: true
  },
  {
    id: 2,
    name: 'Plus Plan',
    price: 99,
    billingCycle: 'Monthly',
    features: ['Advanced customer management', 'Up to 5000 customers', 'Priority email support', 'Campaign analytics'],
    maxBrands: 3,
    active: true
  },
  {
    id: 3,
    name: 'Pro Plan',
    price: 199,
    billingCycle: 'Monthly',
    features: ['Enterprise customer management', 'Unlimited customers', '24/7 phone support', 'Advanced analytics', 'Custom integrations'],
    maxBrands: 10,
    active: true
  },
];

// Sample payment history
const initialPaymentHistory: PaymentHistory[] = [
  { id: 1, brandName: 'Acme Inc.', plan: 'Premium', amount: 199, date: '2025-05-15', status: 'Paid' },
  { id: 2, brandName: 'Global Foods', plan: 'Premium', amount: 199, date: '2025-05-10', status: 'Paid' },
  { id: 3, brandName: 'Tech Solutions', plan: 'Standard', amount: 99, date: '2025-05-08', status: 'Paid' },
  { id: 4, brandName: 'Urban Fashion', plan: 'Basic', amount: 49, date: '2025-05-05', status: 'Failed' },
  { id: 5, brandName: 'Health Plus', plan: 'Standard', amount: 99, date: '2025-05-01', status: 'Paid' },
];

// Plan edit form schema
const planFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  price: z.coerce.number().min(1, { message: 'Price must be at least 1' }),
  billingCycle: z.enum(['Monthly', 'Yearly']),
  maxBrands: z.coerce.number().min(1, { message: 'Max brands must be at least 1' }),
  active: z.boolean().default(true),
  features: z.string(),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlans);
  const [payments, setPayments] = useState<PaymentHistory[]>(initialPaymentHistory);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Setup form
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      billingCycle: 'Monthly',
      maxBrands: 1,
      active: true,
      features: '',
    },
  });

  // Dashboard stats
  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const activeSubscriptions = payments.filter(p => p.status === 'Paid').length;
  const popularPlan = (() => {
    const planCounts: Record<string, number> = {};
    payments.forEach(p => {
      if (p.status === 'Paid') {
        planCounts[p.plan] = (planCounts[p.plan] || 0) + 1;
      }
    });
    return Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  })();

  // Handle edit plan
  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    form.reset({
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      maxBrands: plan.maxBrands,
      active: plan.active,
      features: plan.features.join('\n'),
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete plan
  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(p => p.id !== id));
    toast({
      title: 'Plan deleted',
      description: 'The subscription plan has been deleted.',
    });
  };

  // Handle form submission
  const onSubmit = (values: PlanFormValues) => {
    if (editingPlan) {
      const features = values.features.split('\n').filter(f => f.trim() !== '');

      // Update existing plan
      setPlans(plans.map(p => 
        p.id === editingPlan.id 
          ? { 
              ...p, 
              name: values.name, 
              price: values.price, 
              billingCycle: values.billingCycle, 
              maxBrands: values.maxBrands, 
              active: values.active,
              features
            } 
          : p
      ));
      
      toast({
        title: 'Plan updated',
        description: `${values.name} plan has been updated successfully.`,
      });
    }
    
    setIsEditDialogOpen(false);
    setEditingPlan(null);
    form.reset();
  };

  // Add a new plan
  const handleAddPlan = () => {
    setEditingPlan(null);
    form.reset({
      name: '',
      price: 99,
      billingCycle: 'Monthly',
      maxBrands: 1,
      active: true,
      features: 'Feature 1\nFeature 2\nFeature 3',
    });
    setIsEditDialogOpen(true);
  };

  // Save new plan
  const saveNewPlan = (values: PlanFormValues) => {
    const features = values.features.split('\n').filter(f => f.trim() !== '');
    
    const newPlan: SubscriptionPlan = {
      id: Math.max(...plans.map(p => p.id), 0) + 1,
      name: values.name,
      price: values.price,
      billingCycle: values.billingCycle,
      maxBrands: values.maxBrands,
      active: values.active,
      features
    };
    
    setPlans([...plans, newPlan]);
    
    toast({
      title: 'Plan added',
      description: `${values.name} plan has been added successfully.`,
    });
    
    setIsEditDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Subscription Plans</h1>
        <Button onClick={handleAddPlan}>
          Add New Plan
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              From {activeSubscriptions} active subscriptions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Brands
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              Across all subscription plans
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Popular Plan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popularPlan}</div>
            <p className="text-xs text-muted-foreground">
              Based on active subscriptions
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Subscription plans */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Plans</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={`${!plan.active ? 'opacity-70' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  ${plan.price}/{plan.billingCycle === 'Monthly' ? 'mo' : 'yr'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Up to {plan.maxBrands} {plan.maxBrands === 1 ? 'brand' : 'brands'}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.active ? 'default' : 'outline'}>
                  {plan.active ? 'Active' : 'Inactive'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment history */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Payment History</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.brandName}</TableCell>
                  <TableCell>{payment.plan}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        payment.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Plan edit dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editingPlan ? onSubmit : saveNewPlan)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Basic, Premium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycle</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxBrands"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Brands</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (one per line)</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-sm border border-primary"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Show this plan as available to customers
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingPlan ? 'Update Plan' : 'Add Plan'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
