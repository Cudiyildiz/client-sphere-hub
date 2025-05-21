
import React, { useState } from 'react';
import { Search, MessageSquare, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
interface CustomerMessage {
  id: number;
  customerName: string;
  message: string;
  date: string;
  campaignName: string;
  status: 'new' | 'inProgress' | 'completed' | 'appointment' | 'sold';
  response?: string;
}

const mockMessages: CustomerMessage[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    message: 'Kampanya hakkında detaylı bilgi alabilir miyim?',
    date: '2025-05-18',
    campaignName: 'Yaz İndirimi 2025',
    status: 'new',
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    message: 'Premium üyelik avantajları nelerdir?',
    date: '2025-05-17',
    campaignName: 'Premium Üyelik Kampanyası',
    status: 'inProgress',
    response: 'Merhaba Zeynep Hanım, premium üyelik avantajları hakkında bilgileri paylaştım.'
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    message: 'Randevu alabilir miyim?',
    date: '2025-05-15',
    campaignName: 'Müşteri Sadakat Programı',
    status: 'appointment',
  },
  {
    id: 4,
    customerName: 'Ayşe Yıldız',
    message: 'Bu ürün hakkında detaylı bilgi istiyorum.',
    date: '2025-05-14',
    campaignName: 'Yeni Ürün Lansmanı',
    status: 'completed',
    response: 'Merhaba Ayşe Hanım, ürün detaylarını paylaştım. İyi günler.'
  },
  {
    id: 5,
    customerName: 'Mustafa Şahin',
    message: 'Siparişimi onayladım.',
    date: '2025-05-12',
    campaignName: 'Yaz İndirimi 2025',
    status: 'sold',
  }
];

const BrandMessages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campaignFilter, setcampaignFilter] = useState<string>('all');

  const uniqueCampaigns = [...new Set(mockMessages.map(msg => msg.campaignName))];

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Yeni Mesaj</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">İlgileniliyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Randevu Alındı</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const changeMessageStatus = (messageId: number, newStatus: CustomerMessage['status']) => {
    // In a real application, this would update the backend data
    console.log(`Message ${messageId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Müşteri Mesajları</h1>
        <Button>
          <Check className="mr-2 h-4 w-4" />
          Tümünü İşaretle
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Mesajlarda ara..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Durum Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="new">Yeni Mesajlar</SelectItem>
                <SelectItem value="inProgress">İlgileniliyor</SelectItem>
                <SelectItem value="appointment">Randevu Alındı</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="sold">Satıldı</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={campaignFilter} onValueChange={setcampaignFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kampanya Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                {uniqueCampaigns.map(campaign => (
                  <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="new">Yeni</TabsTrigger>
          <TabsTrigger value="inProgress">İlgileniliyor</TabsTrigger>
          <TabsTrigger value="appointment">Randevu</TabsTrigger>
          <TabsTrigger value="sold">Satıldı</TabsTrigger>
        </TabsList>

        {["all", "new", "inProgress", "appointment", "sold"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
            {filteredMessages
              .filter(msg => tab === "all" || msg.status === tab)
              .map(message => (
                <Card key={message.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{message.customerName}</CardTitle>
                      {getStatusBadge(message.status)}
                    </div>
                    <CardDescription>
                      {new Date(message.date).toLocaleDateString('tr-TR')} - {message.campaignName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm">{message.message}</p>
                      </div>
                      
                      {message.response && (
                        <div className="bg-primary-foreground p-3 rounded-md ml-4 border-l-4 border-primary">
                          <p className="text-sm">{message.response}</p>
                        </div>
                      )}

                      {!message.response && (
                        <div className="flex">
                          <Input className="flex-1 mr-2" placeholder="Yanıt yaz..." />
                          <Button>Yanıtla</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex gap-2">
                      <Select onValueChange={(value) => changeMessageStatus(message.id, value as CustomerMessage['status'])}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Durum Değiştir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Yeni Mesaj</SelectItem>
                          <SelectItem value="inProgress">İlgileniliyor</SelectItem>
                          <SelectItem value="appointment">Randevu Alındı</SelectItem>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                          <SelectItem value="sold">Satıldı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardFooter>
                </Card>
              ))}

            {filteredMessages.filter(msg => tab === "all" || msg.status === tab).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Mesaj bulunamadı</h3>
                <p className="text-sm text-muted-foreground mt-2">Bu kriterlere uygun mesaj bulunmamaktadır.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BrandMessages;
