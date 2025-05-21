
import React, { useState } from 'react';
import { Search, MessageSquare, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data
interface BrandMessage {
  id: number;
  brandName: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'inProgress' | 'resolved' | 'waiting';
  priority: 'high' | 'medium' | 'low';
  response?: string;
}

const mockMessages: BrandMessage[] = [
  {
    id: 1,
    brandName: 'Moda Markası',
    subject: 'Abonelik planı hakkında soru',
    message: 'Merhaba, abonelik planımızı yükseltmek istiyoruz. Premium planın detaylarını paylaşabilir misiniz?',
    date: '2025-05-18',
    status: 'new',
    priority: 'medium'
  },
  {
    id: 2,
    brandName: 'Teknoloji Markası',
    subject: 'Teknik destek talebi',
    message: 'API entegrasyonunda sorun yaşıyoruz. Acil destek almanız mümkün mü?',
    date: '2025-05-17',
    status: 'inProgress',
    priority: 'high',
    response: 'Merhaba, teknik ekibimiz sorununuzla ilgileniyor. API anahtarlarınızı kontrol eder misiniz?'
  },
  {
    id: 3,
    brandName: 'Kozmetik Markası',
    subject: 'Müşteri verileri aktarımı',
    message: 'Mevcut CRM sistemimizden veri aktarımı yapmak istiyoruz. Nasıl bir yol izlemeliyiz?',
    date: '2025-05-15',
    status: 'waiting',
    priority: 'medium'
  },
  {
    id: 4,
    brandName: 'Mobilya Markası',
    subject: 'Özelleştirme talebi',
    message: 'Kampanya modulünde bazı özelleştirmeler yapabilir miyiz? Özel kampanya türleri oluşturmak istiyoruz.',
    date: '2025-05-14',
    status: 'resolved',
    priority: 'low',
    response: 'Merhaba, özelleştirme talebiniz için fiyat teklifi hazırladık. İnceleyip onaylayabilirsiniz.'
  },
  {
    id: 5,
    brandName: 'Spor Markası',
    subject: 'Fatura sorunu',
    message: 'Son faturamızda bir hata olduğunu düşünüyoruz. Kontrol edebilir misiniz?',
    date: '2025-05-12',
    status: 'inProgress',
    priority: 'medium',
    response: 'Faturanızı inceledik ve düzeltilmiş versiyonu e-posta adresinize gönderdik.'
  },
  {
    id: 6,
    brandName: 'Elektronik Markası',
    subject: 'Yeni özellik talebi',
    message: 'Müşteri segmentasyonu için daha detaylı filtreler eklenebilir mi?',
    date: '2025-05-10',
    status: 'waiting',
    priority: 'low'
  }
];

const AdminMessages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Extract unique brands for filter
  const uniqueBrands = [...new Set(mockMessages.map(msg => msg.brandName))];

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = 
      message.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesBrand = brandFilter === 'all' || message.brandName === brandFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesBrand;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Yeni</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">İşlemde</Badge>;
      case 'waiting':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Beklemede</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Çözüldü</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Orta</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Düşük</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marka Mesajları</h1>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Rapor Oluştur
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
                <SelectItem value="new">Yeni</SelectItem>
                <SelectItem value="inProgress">İşlemde</SelectItem>
                <SelectItem value="waiting">Beklemede</SelectItem>
                <SelectItem value="resolved">Çözüldü</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Öncelik Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Marka Filtresi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tüm Markalar</SelectItem>
                {uniqueBrands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
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
          <TabsTrigger value="inProgress">İşlemde</TabsTrigger>
          <TabsTrigger value="waiting">Beklemede</TabsTrigger>
          <TabsTrigger value="resolved">Çözüldü</TabsTrigger>
        </TabsList>

        {["all", "new", "inProgress", "waiting", "resolved"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
            {filteredMessages
              .filter(msg => tab === "all" || msg.status === tab)
              .map(message => (
                <Card key={message.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{message.brandName}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          {getStatusBadge(message.status)}
                          {getPriorityBadge(message.priority)}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(message.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm">{message.message}</p>
                      </div>
                      
                      {message.response && (
                        <div className="bg-primary-foreground p-3 rounded-md ml-4 border-l-4 border-primary">
                          <p className="text-xs text-muted-foreground mb-1">Yanıtınız:</p>
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

export default AdminMessages;
