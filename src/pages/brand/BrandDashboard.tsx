
import React from 'react';
import { MessageSquare, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BrandDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Brand Dashboard</h1>
        <Button>Create New Campaign</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">12%</span> increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">8.2%</span> increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">12 unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">2%</span> increase
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="messages">Recent Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Overview of your ongoing marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Summer Sale 2025', status: 'Active', customers: 423, messages: 124 },
                  { name: 'New Product Launch', status: 'Active', customers: 256, messages: 78 },
                  { name: 'Customer Loyalty Program', status: 'Active', customers: 198, messages: 45 },
                  { name: 'Holiday Promotion', status: 'Scheduled', customers: 0, messages: 0 },
                ].map((campaign, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {campaign.customers} customers
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {campaign.messages} messages
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Messages</CardTitle>
              <CardDescription>Latest interactions from your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Smith', message: 'Interested in your summer sale promotion. Do you ship internationally?', time: '2 hours ago', campaign: 'Summer Sale 2025' },
                  { name: 'Emily Johnson', message: 'When will the new product be available in stores?', time: '5 hours ago', campaign: 'New Product Launch' },
                  { name: 'Michael Brown', message: 'How many loyalty points do I need for the premium tier?', time: '1 day ago', campaign: 'Customer Loyalty Program' },
                  { name: 'Sarah Davis', message: 'Is the discount applicable to all products or just selected items?', time: '1 day ago', campaign: 'Summer Sale 2025' },
                ].map((message, i) => (
                  <div key={i} className="flex items-start space-x-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {message.name.charAt(0)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.name}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Campaign: {message.campaign}
                        </span>
                        <Button size="sm" variant="outline">Reply</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandDashboard;
