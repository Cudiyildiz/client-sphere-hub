
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Mail, Phone, Star, Tag, MessageSquare } from 'lucide-react';
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
  status: 'Gönderildi' | 'Açıldı' | 'Tıklandı' | 'Cevaplanmadı';
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
}

// Mock verisi
const customerTags: CustomerTag[] = [
  { id: 1, name: 'Aktif', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 2, name: 'VIP', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 3, name: 'Yeni', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 4, name: 'Pasif', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { id: 5, name: 'Potansiyel', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 6, name: 'Kayıtlı', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
];

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 (555) 123-4567',
    segment: 'Premium',
    joinDate: '2023-08-15',
    lastActivity: '2025-05-10',
    points: 2350,
    tags: [customerTags[0], customerTags[1]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Açıldı' },
      { id: 2, name: 'Müşteri Sadakat Programı', date: '2025-04-15', status: 'Tıklandı' },
      { id: 3, name: 'Özel Fırsat Duyurusu', date: '2025-04-01', status: 'Gönderildi' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-10', 
        message: 'Sadakat programınız hakkında daha fazla bilgi alabilir miyim?', 
        campaign: 'Müşteri Sadakat Programı',
        response: 'Merhaba, sadakat programımız hakkında detaylı bilgileri e-posta adresinize ilettik. İyi günler dileriz!'
      },
      { 
        id: 2, 
        date: '2025-04-20', 
        message: 'Yaz indirimleri ne zaman başlıyor?', 
        campaign: 'Yaz İndirimi 2025' 
      }
    ]
  },
  {
    id: 2,
    name: 'Zeynep Kaya',
    email: 'zeynep@example.com',
    phone: '+90 (555) 987-6543',
    segment: 'Standard',
    joinDate: '2024-11-22',
    lastActivity: '2025-05-15',
    points: 1250,
    tags: [customerTags[0], customerTags[2]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Tıklandı' },
      { id: 2, name: 'Yeni Ürün Lansmanı', date: '2025-04-10', status: 'Açıldı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-15', 
        message: 'Yeni ürünleriniz hakkında bilgi alabilir miyim?', 
        campaign: 'Yeni Ürün Lansmanı',
        response: 'Merhaba Zeynep Hanım, yeni ürün kataloğumuzu e-posta adresinize gönderdik. İnceleyebilirsiniz.'
      }
    ]
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '+90 (555) 456-7890',
    segment: 'Premium',
    joinDate: '2023-05-10',
    lastActivity: '2025-05-18',
    points: 3450,
    tags: [customerTags[0], customerTags[1], customerTags[5]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Tıklandı' },
      { id: 2, name: 'Müşteri Sadakat Programı', date: '2025-04-15', status: 'Tıklandı' },
      { id: 3, name: 'Özel Fırsat Duyurusu', date: '2025-04-01', status: 'Açıldı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-18', 
        message: 'Premium üyelere özel ayrıcalıklar nelerdir?', 
        campaign: 'Müşteri Sadakat Programı' 
      }
    ]
  },
  {
    id: 4,
    name: 'Ayşe Yıldız',
    email: 'ayse@example.com',
    phone: '+90 (555) 789-0123',
    segment: 'Basic',
    joinDate: '2025-01-05',
    lastActivity: '2025-04-30',
    points: 650,
    tags: [customerTags[4], customerTags[2]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Gönderildi' },
      { id: 2, name: 'Yeni Üye Hoş Geldin', date: '2025-01-05', status: 'Açıldı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-04-15', 
        message: 'Üyelik seviyemi nasıl yükseltebilirim?', 
        campaign: 'Yeni Üye Hoş Geldin',
        response: 'Merhaba Ayşe Hanım, üyelik seviyenizi yükseltmek için 1000 puan toplamanız gerekmektedir. Şu an 650 puanınız bulunmaktadır.'
      }
    ]
  },
  {
    id: 5,
    name: 'Mustafa Şahin',
    email: 'mustafa@example.com',
    phone: '+90 (555) 321-6547',
    segment: 'Standard',
    joinDate: '2024-09-20',
    lastActivity: '2025-05-12',
    points: 1820,
    tags: [customerTags[0], customerTags[5]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Açıldı' },
      { id: 2, name: 'Müşteri Sadakat Programı', date: '2025-04-15', status: 'Cevaplanmadı' }
    ],
    messages: [
      { 
        id: 1, 
        date: '2025-05-12', 
        message: 'Kampanya detaylarınızı öğrenebilir miyim?', 
        campaign: 'Yaz İndirimi 2025',
        response: 'Merhaba Mustafa Bey, kampanya detaylarımızı inceleyebilirsiniz: [link]. İyi günler dileriz!'
      }
    ]
  },
  {
    id: 6,
    name: 'Elif Öztürk',
    email: 'elif@example.com',
    phone: '+90 (555) 111-2233',
    segment: 'Basic',
    joinDate: '2025-02-15',
    lastActivity: '2025-05-05',
    points: 450,
    tags: [customerTags[2], customerTags[4]],
    campaigns: [
      { id: 1, name: 'Yaz İndirimi 2025', date: '2025-05-01', status: 'Gönderildi' }
    ],
    messages: []
  }
];

const CustomerCard: React.FC<{ customer: Customer, onClick: () => void }> = ({ customer, onClick }) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{customer.name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">{customer.points}</span>
          </div>
        </div>
        <CardDescription className="flex gap-2 mt-1">
          {customer.tags.map(tag => (
            <Badge key={tag.id} variant="outline" className={tag.color}>
              {tag.name}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{customer.segment}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Üyelik: {new Date(customer.joinDate).toLocaleDateString('tr-TR')}
        </div>
        <div className="text-xs text-muted-foreground">
          Son aktivite: {new Date(customer.lastActivity).toLocaleDateString('tr-TR')}
        </div>
      </CardFooter>
    </Card>
  );
};

const CustomerDetail: React.FC<{ customer: Customer, onClose: () => void }> = ({ customer, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onClose}>
            <Users className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            <div className="flex gap-2 mt-1">
              {customer.tags.map(tag => (
                <Badge key={tag.id} variant="outline" className={tag.color}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-primary-foreground p-2 rounded-lg">
          <Star className="h-5 w-5 text-amber-500" />
          <div>
            <div className="text-sm font-medium">Müşteri Puanı</div>
            <div className="text-2xl font-bold">{customer.points}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Segment Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{customer.segment} Segment</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>Üyelik Tarihi: {new Date(customer.joinDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aktivite Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{customer.messages.length} mesaj</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>Son Aktivite: {new Date(customer.lastActivity).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Kampanya Geçmişi</TabsTrigger>
          <TabsTrigger value="messages">Mesaj Geçmişi</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampanya Geçmişi</CardTitle>
              <CardDescription>Müşterinin katıldığı kampanyalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.campaigns.length > 0 ? (
                  customer.campaigns.map(campaign => (
                    <div key={campaign.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(campaign.date).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <Badge className={
                        campaign.status === 'Tıklandı' ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                        campaign.status === 'Açıldı' ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                        campaign.status === 'Gönderildi' ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">Kampanya geçmişi bulunamadı</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mesaj Geçmişi</CardTitle>
              <CardDescription>Müşteri mesajları ve yanıtlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customer.messages.length > 0 ? (
                  customer.messages.map(message => (
                    <div key={message.id} className="space-y-3">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Müşteri Mesajı</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(message.date).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div className="text-sm mt-2">{message.message}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Kampanya: {message.campaign}
                        </div>
                      </div>
                      
                      {message.response && (
                        <div className="bg-primary-foreground p-4 rounded-lg ml-6">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Yanıtınız</h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(message.date).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                          <div className="text-sm mt-2">{message.response}</div>
                        </div>
                      )}
                      
                      {!message.response && (
                        <div className="flex justify-end">
                          <Button variant="outline">Yanıtla</Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">Mesaj geçmişi bulunamadı</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filtreleme fonksiyonları
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSegment = selectedSegment === "all" || customer.segment.toLowerCase() === selectedSegment.toLowerCase();
    
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Müşteriler</h1>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Yeni Müşteri Ekle
        </Button>
      </div>
      
      {!selectedCustomer ? (
        <>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Müşteri ara..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedSegment === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedSegment("all")}
              >
                Tümü
              </Button>
              <Button 
                variant={selectedSegment === "premium" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSegment("premium")}
              >
                Premium
              </Button>
              <Button 
                variant={selectedSegment === "standard" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSegment("standard")}
              >
                Standard
              </Button>
              <Button 
                variant={selectedSegment === "basic" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSegment("basic")}
              >
                Basic
              </Button>
            </div>
          </div>
          
          {filteredCustomers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCustomers.map(customer => (
                <CustomerCard 
                  key={customer.id} 
                  customer={customer} 
                  onClick={() => setSelectedCustomer(customer)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Müşteri bulunamadı</h3>
              <p className="text-sm text-muted-foreground mt-2">Arama kriterlerinize uygun müşteri bulunmamaktadır.</p>
            </div>
          )}
        </>
      ) : (
        <CustomerDetail 
          customer={selectedCustomer} 
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;
