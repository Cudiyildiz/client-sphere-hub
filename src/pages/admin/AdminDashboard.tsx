
import React from 'react';
import { Users, Building2, CreditCard, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-5 w-5 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3 text-green-500" />
          <span className="text-green-500">{change}</span> from last month
        </p>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Paneli</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Staff"
          value="12"
          icon={<Users className="h-4 w-4" />}
          change="2.5%"
        />
        <StatCard
          title="Total Brands"
          value="36"
          icon={<Building2 className="h-4 w-4" />}
          change="10.3%"
        />
        <StatCard
          title="Monthly Revenue"
          value="$12,234"
          icon={<CreditCard className="h-4 w-4" />}
          change="4.1%"
        />
        <StatCard
          title="Active Subscriptions"
          value="28"
          icon={<Users className="h-4 w-4" />}
          change="3.2%"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Staff Activity</CardTitle>
            <CardDescription>Latest actions from staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', action: 'Created new brand account', time: '2 hours ago' },
                { name: 'Sarah Smith', action: 'Updated campaign settings', time: '5 hours ago' },
                { name: 'Mark Johnson', action: 'Resolved customer ticket', time: '1 day ago' },
                { name: 'Emily Davis', action: 'Added new staff member', time: '2 days ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {item.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
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
            <CardTitle>New Brand Signups</CardTitle>
            <CardDescription>Recently onboarded brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Acme Inc.', plan: 'Premium Plan', date: 'May 15, 2025' },
                { name: 'Tech Solutions', plan: 'Standard Plan', date: 'May 12, 2025' },
                { name: 'Global Foods', plan: 'Premium Plan', date: 'May 10, 2025' },
                { name: 'Urban Fashion', plan: 'Basic Plan', date: 'May 8, 2025' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.plan}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
