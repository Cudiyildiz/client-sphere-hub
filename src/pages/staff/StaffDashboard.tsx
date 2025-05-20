
import React from 'react';
import { Building2, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StaffDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Staff Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Brands</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">4 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">6 requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">129</div>
            <p className="text-xs text-muted-foreground">32 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">0.5h faster than target</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Brand Activity</CardTitle>
            <CardDescription>Latest updates from your assigned brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { brand: 'Acme Inc.', action: 'Started new campaign', time: '1 hour ago' },
                { brand: 'Tech Solutions', action: 'Updated customer data', time: '3 hours ago' },
                { brand: 'Global Foods', action: 'Raised support ticket', time: '5 hours ago' },
                { brand: 'Urban Fashion', action: 'Added new team member', time: '1 day ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {item.brand.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.brand}</p>
                    <p className="text-sm text-muted-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Urgent Tickets</CardTitle>
            <CardDescription>Customer support tickets requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { brand: 'Acme Inc.', issue: 'Campaign not showing correct data', priority: 'High' },
                { brand: 'Tech Solutions', issue: 'Unable to access customer records', priority: 'Critical' },
                { brand: 'Global Foods', issue: 'Billing discrepancy on subscription', priority: 'Medium' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      {item.brand.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.brand}</p>
                      <p className="text-xs text-muted-foreground">{item.issue}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        item.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                        item.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Respond</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
