import React, { useState } from 'react';
import { Search, Users, Mail, Phone, MessageSquare, Calendar, Tag, Filter, X, Edit, Save, BadgePercent, Star, List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Tanımlamalar
interface CustomerTag {
  id: number;
  name: string;
  color: string;
}

interface CustomerMessage {
  id: number;
  date: string;
  message: string;
  campaign: string;
  response?: string;
}

interface CustomerCampaign {
  id: number;
  name: string;
  date: string;
  status: 'Gönderildi' | 'Açıldı' | 'Tıklandı' | 'Cevaplanmadı' | 'Başarısız';
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  segment: 'Premium' | 'Standard' | 'Basic';
  joinDate: string;
  lastActivity: string;
  points: number;
  tags: CustomerTag[];
  campaigns: CustomerCampaign[];
  messages: CustomerMessage[];
  image?: string;
  notes?: string;
  status: 'Randevu' | 'Satıldı' | 'İlgileniyor';
}

// Mock verisi
const customerTags: CustomerTag[] = [
  { id: 1, name: 'Sıcak Lider', color: 'bg-red-100 text-red-800 border-red-200' },
  { id: 2, name: 'VIP Müşteri', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 3, name: 'Yeni Talep', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 4, name: 'Takip Gerekli', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 5, name: 'Takip Gerekiyor', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 6, name: 'Teknoloji Meraklısı', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
];

// Placeholder görselleri
const customerImages = [
  "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket_1142-41044.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph",
  "https://img.freepik.com/free-photo/3d-cartoon-character-isolated-white-background-with-phone_1142-54246.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph",
  "https://img.freepik.com/free-photo/3d-render-young-man-3d-cartoon-avatar-portrait-character-boy-colorful-style-generative-ai_1258-150704.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph",
  "https://img.freepik.com/free-photo/3d-render-asian-teenage-girl-with-jacket-generative-ai_1409-5607.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph",
  "https://img.freepik.com/free-photo/3d-render-cartoon-avatar-stylish-girl-generative-ai_1258-151397.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph",
  "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151033001.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1715817600&semt=sph"
];

// Kampanya listeleri
const campaignList = [
  'Yaz İndirimleri', 
  'Teknoloji Fuarı 2025', 
  "Fitness'ta Bahar Kampanyası", 
  'Okul Dönüşü Kampanyası',
  'Kış Harikaları Diyarı'
];

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    phone: '+123456789',
    segment: 'Premium',
    joinDate: '2023-08-15',
    lastActivity: '2025-05-10',
    points: 85,
    tags: [customerTags[0], customerTags[5]],
    campaigns: [
      { id: 1, name: campaignList[0], date: '2025-05-01', status: 'Açıldı' },
      { id: 2, name: campaignList[2], date: '2025-03-15', status: 'Tıklandı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-10', 
        message: 'Sadakat programınız hakkında daha fazla bilgi alabilir miyim?', 
        campaign: campaignList[0],
        response: 'Merhaba, sadakat programımız hakkında detaylı bilgileri e-posta adresinize ilettik. İyi günler dileriz!'
      },
      { 
        id: 2, 
        date: '2025-03-20', 
        message: 'Fitness programı için üyelik şartları neler?', 
        campaign: campaignList[2],
        response: 'Merhaba Alice, fitness programımıza katılmak için herhangi bir ön koşul bulunmamaktadır.'
      }
    ],
    image: customerImages[0],
    notes: 'Alice is interested in our new app launch. Follow up next week. Loves tech gadgets.',
    status: 'Randevu'
  },
  {
    id: 2,
    name: 'Charlie Chaplin',
    email: 'charlie@example.com',
    phone: '+1122334455',
    segment: 'Standard',
    joinDate: '2024-11-22',
    lastActivity: '2025-05-15',
    points: 95,
    tags: [customerTags[5], customerTags[3]],
    campaigns: [
      { id: 1, name: campaignList[1], date: '2025-05-01', status: 'Tıklandı' },
      { id: 2, name: campaignList[4], date: '2025-01-10', status: 'Gönderildi' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-15', 
        message: 'Yeni ürünleriniz hakkında bilgi alabilir miyim?', 
        campaign: campaignList[1],
        response: 'Merhaba Charlie, yeni ürün kataloğumuzu e-posta adresinize gönderdik. İnceleyebilirsiniz.'
      }
    ],
    image: customerImages[1],
    notes: 'Purchased the premium package. Add to VIP list.',
    status: 'Satıldı'
  },
  {
    id: 3,
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    phone: '+5544332211',
    segment: 'Premium',
    joinDate: '2023-05-10',
    lastActivity: '2025-05-18',
    points: 88,
    tags: [customerTags[2], customerTags[3]],
    campaigns: [
      { id: 1, name: campaignList[2], date: '2025-05-01', status: 'Tıklandı' },
      { id: 2, name: campaignList[3], date: '2024-09-05', status: 'Açıldı' },
      { id: 3, name: campaignList[0], date: '2024-06-20', status: 'Başarısız' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-18', 
        message: 'Premium üyelere özel ayrıcalıklar nelerdir?', 
        campaign: campaignList[2]
      },
      { 
        id: 2, 
        date: '2024-09-10', 
        message: 'Okul kampanyasına nasıl katılabilirim?', 
        campaign: campaignList[3],
        response: 'Merhaba Ethan, kampanyaya katılmak için web sitemizdeki formu doldurabilirsiniz.'
      }
    ],
    image: customerImages[2],
    notes: 'Meeting scheduled to discuss integration with spy tools.',
    status: 'Randevu'
  },
  {
    id: 4,
    name: 'Fiona Shrek',
    email: 'fiona@example.com',
    phone: '+4433221100',
    segment: 'Basic',
    joinDate: '2025-01-05',
    lastActivity: '2025-04-30',
    points: 92,
    tags: [customerTags[4], customerTags[2]],
    campaigns: [
      { id: 1, name: campaignList[0], date: '2025-05-01', status: 'Gönderildi' },
      { id: 2, name: campaignList[4], date: '2025-02-15', status: 'Cevaplanmadı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-04-15', 
        message: 'Üyelik seviyemi nasıl yükseltebilirim?', 
        campaign: 'Yeni Üye Hoş Geldin',
        response: 'Merhaba Fiona Hanım, üyelik seviyenizi yükseltmek için 1000 puan toplamanız gerekmektedir.'
      }
    ],
    image: customerImages[3],
    notes: 'Closed deal on the enterprise solution. Send a thank you gift.',
    status: 'Satıldı'
  },
  {
    id: 5,
    name: 'Diana Prince',
    email: 'diana@example.com',
    phone: '+6677889900',
    segment: 'Premium',
    joinDate: '2024-09-20',
    lastActivity: '2025-05-12',
    points: 90,
    tags: [customerTags[5], customerTags[1]],
    campaigns: [
      { id: 1, name: campaignList[3], date: '2025-05-01', status: 'Gönderildi' },
      { id: 2, name: campaignList[1], date: '2024-12-10', status: 'Tıklandı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-12', 
        message: 'Güvenlik özellikleri hakkında daha fazla bilgi alabilir miyim?', 
        campaign: campaignList[3],
        response: 'Merhaba Diana, güvenlik özelliklerimiz hakkında detaylı bir broşür gönderdik.'
      }
    ],
    image: customerImages[4],
    notes: 'Interested in the security features of our app. Follow up with a detailed brochure.',
    status: 'İlgileniyor'
  },
  {
    id: 6,
    name: 'Bob Builder',
    email: 'bob@example.com',
    phone: '+0987654321',
    segment: 'Basic',
    joinDate: '2025-02-15',
    lastActivity: '2025-05-05',
    points: 90,
    tags: [customerTags[5], customerTags[3]],
    campaigns: [
      { id: 1, name: campaignList[4], date: '2025-05-01', status: 'Gönderildi' },
      { id: 2, name: campaignList[2], date: '2025-03-05', status: 'Açıldı' },
      { id: 3, name: campaignList[0], date: '2024-07-15', status: 'Tıklandı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-05', 
        message: 'Demo için randevu ayarlayabilir miyiz?', 
        campaign: campaignList[4],
        response: 'Merhaba Bob, demo için Çarşamba günü müsait misiniz?'
      },
      { 
        id: 2, 
        date: '2025-03-10', 
        message: 'Fitness programının süresi ne kadar?', 
        campaign: campaignList[2],
        response: 'Merhaba Bob, fitness programımız 12 hafta sürmektedir.'
      }
    ],
    image: customerImages[5],
    notes: 'Scheduled a demo for next Wednesday. Works in construction tech.',
    status: 'Randevu'
  }
];

// Create a new component for the list view
const CustomerListItem: React.FC<{ customer: Customer, onClick: () => void }> = ({ customer, onClick }) => {
  // Get status color
  const getStatusColor = () => {
    switch (customer.status) {
      case 'Randevu': return 'bg-blue-100 text-blue-800';
      case 'Satıldı': return 'bg-green-100 text-green-800';
      case 'İlgileniyor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Last campaign
  const lastCampaign = customer.campaigns.length > 0 ? 
    customer.campaigns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null;
  
  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={onClick}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          {customer.image && (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={customer.image} alt={customer.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-xs text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">{customer.phone}</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {customer.segment === 'Premium' && <Star className="h-3 w-3 text-amber-500" fill="currentColor" />}
          {customer.segment}
        </div>
      </TableCell>
      <TableCell>
        <div>
          {lastCampaign?.name || 'Kampanya yok'}
          {lastCampaign && (
            <div className="mt-1">
              <Badge variant="outline" className={
                lastCampaign.status === 'Tıklandı' ? 'bg-green-100 text-green-800 border-green-200' :
                lastCampaign.status === 'Açıldı' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                'bg-gray-100 text-gray-800 border-gray-200'
              }>
                {lastCampaign.status}
              </Badge>
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            Toplam {customer.campaigns.length} kampanya
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {customer.tags.slice(0, 2).map(tag => (
            <Badge key={tag.id} variant="outline" className={tag.color}>
              {tag.name}
            </Badge>
          ))}
          {customer.tags.length > 2 && (
            <Badge variant="outline">+{customer.tags.length - 2}</Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor()}>
          {customer.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="text-sm">{customer.points}</div>
      </TableCell>
    </TableRow>
  );
};

// Müşteri detay sayfası yan panel bileşeni
const CustomerDetail: React.FC<{ 
  customer: Customer | null, 
  onClose: () => void,
  isOpen: boolean,
  onCustomerUpdate: (updatedCustomer: Customer) => void
}> = ({ customer, onClose, isOpen, onCustomerUpdate }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editedPoints, setEditedPoints] = useState('');
  const [editedSegment, setEditedSegment] = useState<'Premium' | 'Standard' | 'Basic' | ''>('');
  const [activeTab, setActiveTab] = useState('info');
  
  if (!customer) return null;
  
  // Durum rengini belirle
  const getStatusColor = () => {
    switch (customer.status) {
      case 'Randevu': return 'bg-blue-100 text-blue-800';
      case 'Satıldı': return 'bg-green-100 text-green-800';
      case 'İlgileniyor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Mesaj kodu
  const messageCode = `MSG${String(customer.id).padStart(4, '0')}`;
  
  const handleEditToggle = () => {
    if (editMode) {
      // Düzenleme modundan çıkış
      setEditMode(false);
      setEditedPoints('');
      setEditedSegment('');
    } else {
      // Düzenleme moduna giriş
      setEditMode(true);
      setEditedPoints(customer.points.toString());
      setEditedSegment(customer.segment);
    }
  };
  
  const handleSaveChanges = () => {
    if (!customer) return;
    
    const points = parseInt(editedPoints);
    if (isNaN(points) || points < 0) {
      toast({
        title: "Hata",
        description: "Geçerli bir puan değeri giriniz.",
        variant: "destructive"
      });
      return;
    }
    
    if (!editedSegment) {
      toast({
        title: "Hata",
        description: "Lütfen bir segment seçiniz.",
        variant: "destructive"
      });
      return;
    }
    
    // Update customer data
    const updatedCustomer = {
      ...customer,
      points,
      segment: editedSegment as 'Premium' | 'Standard' | 'Basic'
    };
    
    onCustomerUpdate(updatedCustomer);
    setEditMode(false);
    
    toast({
      title: "Başarılı",
      description: "Müşteri bilgileri güncellendi.",
    });
  };
  
  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'Tıklandı': return 'bg-green-100 text-green-800 border-green-200';
      case 'Açıldı': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Gönderildi': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cevaplanmadı': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Başarısız': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-2xl flex items-center gap-2">
              {customer.name}
              {customer.segment === 'Premium' && <Star className="h-4 w-4 text-amber-500" fill="currentColor" />}
            </SheetTitle>
            <Badge className={getStatusColor()}>{customer.status}</Badge>
          </div>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Bilgiler</TabsTrigger>
            <TabsTrigger value="campaigns">Kampanyalar</TabsTrigger>
            <TabsTrigger value="messages">Mesajlar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6 pt-4">
            {/* Müşteri Bilgileri */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">İletişim Bilgileri</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </div>
            
            {/* Durum Bilgileri */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Durum</h3>
                {!editMode ? (
                  <Button variant="ghost" size="sm" onClick={handleEditToggle} className="h-8 px-2">
                    <Edit className="h-4 w-4 mr-1" /> Düzenle
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleEditToggle} className="h-8 px-2">
                    <X className="h-4 w-4 mr-1" /> İptal
                  </Button>
                )}
              </div>
              
              <div className="bg-muted rounded-md p-4 space-y-4">
                <div className="flex gap-3">
                  {editMode ? (
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Segment</div>
                      <Select 
                        value={editedSegment} 
                        onValueChange={(val) => setEditedSegment(val as 'Premium' | 'Standard' | 'Basic')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Segment seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Segment</div>
                      <div className="flex items-center gap-1 font-medium">
                        {customer.segment === 'Premium' && <Star className="h-3 w-3 text-amber-500" fill="currentColor" />}
                        {customer.segment}
                      </div>
                    </div>
                  )}
                  
                  {editMode ? (
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Puanı</div>
                      <Input 
                        type="number" 
                        value={editedPoints} 
                        onChange={(e) => setEditedPoints(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Puanı</div>
                      <div className="font-medium flex items-center gap-1">
                        <BadgePercent className="h-3 w-3 text-primary" />
                        {customer.points}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Üyelik Tarihi</div>
                    <div className="font-medium">
                      {new Date(customer.joinDate).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                </div>
                
                {editMode && (
                  <Button onClick={handleSaveChanges} className="w-full">
                    <Save className="h-4 w-4 mr-2" /> Değişiklikleri Kaydet
                  </Button>
                )}
              </div>
            </div>
            
            {/* Etiketler */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map(tag => (
                  <Badge key={tag.id} variant="outline" className={tag.color}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Dahili Notlar */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Dahili Notlar</h3>
              <Card className="bg-muted">
                <CardContent className="p-3">
                  <p className="text-sm">{customer.notes}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Kampanya Geçmişi</h3>
              {customer.campaigns.length > 0 ? (
                customer.campaigns
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden">
                      <CardHeader className="py-2 px-3 bg-muted">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{campaign.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={getCampaignStatusColor(campaign.status)}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(campaign.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        
                        {/* İlgili Mesajlar */}
                        {customer.messages.some(msg => msg.campaign === campaign.name) && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="text-xs font-medium mb-2">İlgili Mesajlar:</div>
                            {customer.messages
                              .filter(msg => msg.campaign === campaign.name)
                              .map((msg) => (
                                <div key={msg.id} className="ml-2 my-2 pl-2 border-l-2 border-primary text-xs">
                                  <div className="text-muted-foreground">
                                    {new Date(msg.date).toLocaleDateString('tr-TR')}
                                  </div>
                                  <div>{msg.message}</div>
                                </div>
                              ))
                            }
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">
                  Kampanya geçmişi bulunamadı
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Mesaj Geçmişi</h3>
              {customer.messages.length > 0 ? (
                customer.messages
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(message => (
                    <div key={message.id} className="space-y-2">
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">{messageCode}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.date).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div className="mt-1 text-sm">{message.message}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Kampanya: {message.campaign}
                        </div>
                      </div>
                      
                      {message.response && (
                        <div className="bg-primary-foreground p-3 rounded-md ml-6 border-l-4 border-primary">
                          <p className="text-xs text-muted-foreground mb-1">Marka yanıtı:</p>
                          <p className="text-sm">{message.response}</p>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Mesaj geçmişi bulunamadı</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaj Gönder
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const FilterDialog: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  currentTags: string[],
  onTagsChange: (tags: string[]) => void,
  currentStatus: string,
  onStatusChange: (status: string) => void,
  currentCampaign: string,
  onCampaignChange: (campaign: string) => void,
}> = ({isOpen, onClose, currentTags, onTagsChange, currentStatus, onStatusChange, currentCampaign, onCampaignChange}) => {
  // Geçici filtre state'leri
  const [tempTags, setTempTags] = useState(currentTags);
  const [tempStatus, setTempStatus] = useState(currentStatus);
  const [tempCampaign, setTempCampaign] = useState(currentCampaign);
  
  // Tag ekle/çıkar
  const toggleTag = (tagName: string) => {
    if (tempTags.includes(tagName)) {
      setTempTags(tempTags.filter(t => t !== tagName));
    } else {
      setTempTags([...tempTags, tagName]);
    }
  };
  
  // Filtreleri uygula
  const applyFilters = () => {
    onTagsChange(tempTags);
    onStatusChange(tempStatus);
    onCampaignChange(tempCampaign);
    onClose();
  };
  
  // Filtreleri sıfırla
  const resetFilters = () => {
    setTempTags([]);
    setTempStatus('all');
    setTempCampaign('all');
    onTagsChange([]);
    onStatusChange('all');
    onCampaignChange('all');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtreleri Ayarla</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Etiket filtreleri */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {customerTags.map(tag => (
                <Badge 
                  key={tag.id} 
                  variant={tempTags.includes(tag.name) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Durum filtreleri */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Durum</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={tempStatus === 'all' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTempStatus('all')}
              >
                Tümü
              </Badge>
              <Badge 
                variant={tempStatus === 'Randevu' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTempStatus('Randevu')}
              >
                Randevu
              </Badge>
              <Badge 
                variant={tempStatus === 'Satıldı' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTempStatus('Satıldı')}
              >
                Satıldı
              </Badge>
              <Badge 
                variant={tempStatus === 'İlgileniyor' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTempStatus('İlgileniyor')}
              >
                İlgileniyor
              </Badge>
            </div>
          </div>
          
          {/* Kampanya filtreleri */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Kampanya</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={tempCampaign === 'all' ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTempCampaign('all')}
              >
                Tüm Kampanyalar
              </Badge>
              {campaignList.map((campaign, index) => (
                <Badge 
                  key={index} 
                  variant={tempCampaign === campaign ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTempCampaign(campaign)}
                >
                  {campaign}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="ghost" onClick={resetFilters}>
            Filtreleri Temizle
          </Button>
          <Button onClick={applyFilters}>
            Filtreleri Uygula
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Filtreler
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');

  // Filtreleme fonksiyonları
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    const matchesCampaign = selectedCampaign === 'all' || 
      customer.campaigns.some(c => c.name === selectedCampaign);
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => customer.tags.some(t => t.name === tag));
    
    return matchesSearch && matchesStatus && matchesCampaign && matchesTags;
  });

  // Müşteri seçme ve detay gösterme
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  // Müşteri güncelleme
  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    );
    
    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomer);
    
    toast({
      title: "Müşteri Güncellendi",
      description: `${updatedCustomer.name} bilgileri başarıyla güncellendi.`
    });
  };

  // Aktif filtreleri gösterme
  const hasActiveFilters = selectedTags.length > 0 || selectedStatus !== 'all' || selectedCampaign !== 'all';
  
  // Aktif filtre sayısını hesaplama
  const activeFilterCount = selectedTags.length + 
    (selectedStatus !== 'all' ? 1 : 0) + 
    (selectedCampaign !== 'all' ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Müşteriler</h1>
        <div className="flex gap-2">
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded-none rounded-l-md"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded-none rounded-r-md"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtrele
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Yeni Müşteri Ekle
          </Button>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Müşteri adı, e-posta veya telefon ile ara..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Aktif filtreler */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Aktif Filtreler:</span>
          {selectedTags.map(tag => (
            <Badge 
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
              />
            </Badge>
          ))}
          {selectedStatus !== 'all' && (
            <Badge 
              variant="secondary"
              className="flex items-center gap-1"
            >
              Durum: {selectedStatus}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedStatus('all')}
              />
            </Badge>
          )}
          {selectedCampaign !== 'all' && (
            <Badge 
              variant="secondary"
              className="flex items-center gap-1"
            >
              Kampanya: {selectedCampaign}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedCampaign('all')}
              />
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs"
            onClick={() => {
              setSelectedTags([]);
              setSelectedStatus('all');
              setSelectedCampaign('all');
            }}
          >
            Tümünü Temizle
          </Button>
        </div>
      )}
      
      {filteredCustomers.length > 0 ? (
        viewMode === 'list' ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Son Kampanya</TableHead>
                  <TableHead>Etiketler</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Puan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <CustomerListItem 
                    key={customer.id} 
                    customer={customer} 
                    onClick={() => handleSelectCustomer(customer)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map(customer => (
              <CustomerCard 
                key={customer.id} 
                customer={customer} 
                onClick={() => handleSelectCustomer(customer)}
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Müşteri bulunamadı</h3>
          <p className="text-sm text-muted-foreground mt-2">Arama kriterlerinize uygun müşteri bulunmamaktadır.</p>
        </div>
      )}
      
      {/* Müşteri detay yan paneli */}
      <CustomerDetail 
        customer={selectedCustomer}
        onClose={() => setIsDetailOpen(false)}
        isOpen={isDetailOpen}
        onCustomerUpdate={handleUpdateCustomer}
      />
      
      {/* Filtre diyaloğu */}
      <FilterDialog 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentTags={selectedTags}
        onTagsChange={setSelectedTags}
        currentStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        currentCampaign={selectedCampaign}
        onCampaignChange={setSelectedCampaign}
      />
    </div>
  );
};

export default Customers;
