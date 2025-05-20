
import React, { useState } from 'react';
import { Plus, MessageSquare, MoreHorizontal, Edit, Trash, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

// Define the Campaign type
interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'Draft' | 'Scheduled' | 'Active' | 'Completed';
  customers: number;
  messages: number;
  startDate: string;
  endDate: string;
}

// Sample campaign data
const initialCampaigns: Campaign[] = [
  { 
    id: 1, 
    name: 'Summer Sale 2025', 
    description: 'Promotional campaign for summer products with special discounts',
    status: 'Active', 
    customers: 423, 
    messages: 124,
    startDate: '2025-05-15',
    endDate: '2025-06-15',
  },
  { 
    id: 2, 
    name: 'New Product Launch', 
    description: 'Campaign to introduce our new product line to customers',
    status: 'Active', 
    customers: 256, 
    messages: 78,
    startDate: '2025-05-10',
    endDate: '2025-05-30',
  },
  { 
    id: 3, 
    name: 'Customer Loyalty Program', 
    description: 'Special offers and rewards for our most loyal customers',
    status: 'Active', 
    customers: 198, 
    messages: 45,
    startDate: '2025-04-01',
    endDate: '2025-06-30',
  },
  { 
    id: 4, 
    name: 'Holiday Promotion', 
    description: 'Special holiday deals and gift ideas for the upcoming season',
    status: 'Scheduled', 
    customers: 0, 
    messages: 0,
    startDate: '2025-11-15',
    endDate: '2025-12-25',
  },
];

// Form schema
const campaignFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  status: z.enum(['Draft', 'Scheduled', 'Active', 'Completed']),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const { toast } = useToast();

  // Form setup
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'Draft',
      startDate: '',
      endDate: '',
    },
  });

  // Handle adding new campaign
  const onSubmit = (values: CampaignFormValues) => {
    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(
        campaigns.map((c) =>
          c.id === editingCampaign.id
            ? { ...c, ...values } as Campaign
            : c
        )
      );
      toast({
        title: 'Campaign updated',
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new campaign
      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        name: values.name,
        description: values.description,
        status: values.status,
        startDate: values.startDate,
        endDate: values.endDate,
        customers: 0,
        messages: 0,
      };
      
      setCampaigns([...campaigns, newCampaign]);
      
      toast({
        title: 'Campaign created',
        description: `${values.name} has been created successfully.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingCampaign(null);
    form.reset();
  };

  // Handle edit campaign
  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    form.reset({
      name: campaign.name,
      description: campaign.description,
      status: campaign.status,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete campaign
  const handleDelete = (id: number) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast({
      title: 'Campaign deleted',
      description: 'The campaign has been deleted successfully.',
    });
  };

  // Group campaigns by status
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');
  const scheduledCampaigns = campaigns.filter(c => c.status === 'Scheduled');
  const draftCampaigns = campaigns.filter(c => c.status === 'Draft');
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Campaign Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCampaign(null);
              form.reset({
                name: '',
                description: '',
                status: 'Draft',
                startDate: '',
                endDate: '',
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
              <DialogDescription>
                {editingCampaign 
                  ? 'Update the campaign details below.' 
                  : 'Fill in the details below to create a new marketing campaign.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter campaign name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the campaign purpose and goals" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                          <option value="Draft">Draft</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingCampaign ? 'Update' : 'Create'} Campaign</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Active Campaigns</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.length > 0 ? (
            activeCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">No active campaigns.</p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Scheduled Campaigns</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scheduledCampaigns.length > 0 ? (
            scheduledCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">No scheduled campaigns.</p>
          )}
        </div>
      </div>
      
      {draftCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Draft Campaigns</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Completed Campaigns</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mt-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(campaign.id)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              campaign.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : campaign.status === 'Scheduled'
                ? 'bg-blue-100 text-blue-800'
                : campaign.status === 'Draft'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-purple-100 text-purple-800'
            }`}
          >
            {campaign.status}
          </span>
          <span className="text-xs text-muted-foreground">
            {campaign.startDate} to {campaign.endDate}
          </span>
        </div>
        <CardDescription className="mt-2">
          {campaign.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{campaign.customers} customers</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{campaign.messages} messages</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full justify-center">
          <span>View Campaign</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Campaigns;
