import React, { useState, useEffect, useCallback, memo } from 'react';
import { MessageSquare, MoreHorizontal, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from '@/components/ui/dialog';
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

// Campaign Detail Dialog component
interface CampaignDetailDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  campaign: Campaign | null;
}

const CampaignDetailDialog = memo(({ isOpen, setIsOpen, campaign }: CampaignDetailDialogProps) => {
  if (!isOpen || !campaign) return null;
  
  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Get status text in Turkish
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'Active': return 'Aktif';
      case 'Scheduled': return 'Zamanlanmış';
      case 'Draft': return 'Taslak';
      case 'Completed': return 'Tamamlandı';
      default: return status;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Kampanya Detayı</DialogTitle>
          <DialogDescription>
            Kampanya bilgilerini görüntülüyorsunuz.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Kampanya Adı</h4>
              <p className="text-sm">{campaign.name}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Durum</h4>
              <p className="text-sm">{getStatusText(campaign.status)}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Tarih Aralığı</h4>
              <p className="text-sm">{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Açıklama</h4>
            <p className="text-sm">{campaign.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3">
              <h4 className="text-sm font-medium text-muted-foreground">Ulaşılan Müşteriler</h4>
              <p className="text-2xl font-bold mt-1">{campaign.customers}</p>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="text-sm font-medium text-muted-foreground">Gönderilen Mesajlar</h4>
              <p className="text-2xl font-bold mt-1">{campaign.messages}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
              Kapat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

CampaignDetailDialog.displayName = 'CampaignDetailDialog';

// Main component
const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const { toast } = useToast();

  // Campaign section filtering
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');
  const scheduledCampaigns = campaigns.filter(c => c.status === 'Scheduled');
  const draftCampaigns = campaigns.filter(c => c.status === 'Draft');
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed');

  // View campaign details
  const handleViewCampaign = useCallback((campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailDialogOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kampanya Yönetimi</h1>
        {/* Removed campaign creation button for brand users */}
      </div>
      
      {/* Campaign detail dialog */}
      <CampaignDetailDialog
        isOpen={isDetailDialogOpen}
        setIsOpen={setIsDetailDialogOpen}
        campaign={selectedCampaign}
      />
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Aktif Kampanyalar</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.length > 0 ? (
            activeCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onView={handleViewCampaign}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">Aktif kampanya yok.</p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Zamanlanmış Kampanyalar</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scheduledCampaigns.length > 0 ? (
            scheduledCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onView={handleViewCampaign}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">Zamanlanmış kampanya yok.</p>
          )}
        </div>
      </div>
      
      {draftCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Taslak Kampanyalar</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onView={handleViewCampaign}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedCampaigns.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Tamamlanmış Kampanyalar</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onView={handleViewCampaign}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Memoized CampaignCard component (view-only for brands)
interface CampaignCardProps {
  campaign: Campaign;
  onView: (campaign: Campaign) => void;
}

const CampaignCard = memo(({ campaign, onView }: CampaignCardProps) => {
  // Format date for display
  const formatDate = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }, []);
  
  // Status in Turkish
  const getStatusText = useCallback((status: string): string => {
    switch (status) {
      case 'Active': return 'Aktif';
      case 'Scheduled': return 'Zamanlanmış';
      case 'Draft': return 'Taslak';
      case 'Completed': return 'Tamamlandı';
      default: return status;
    }
  }, []);
  
  // Event handler
  const handleView = useCallback(() => {
    onView(campaign);
  }, [campaign, onView]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
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
            {getStatusText(campaign.status)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
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
            <span>{campaign.customers} müşteri</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{campaign.messages} mesaj</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full justify-center" onClick={handleView}>
          <span>Kampanyayı Görüntüle</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
});

CampaignCard.displayName = 'CampaignCard';

export default Campaigns;
