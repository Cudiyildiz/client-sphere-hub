
import React, { useState } from 'react';
import { Search, MessageSquare, Calendar, Check, CheckCircle2, AlertCircle, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Mock data
interface CustomerMessage {
  id: number;
  customerName: string;
  message: string;
  date: string;
  campaignName: string;
  status: 'new' | 'inProgress' | 'appointment' | 'completed' | 'sold';
  response?: string;
  initialLetter?: string;
}

const mockMessages: CustomerMessage[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    message: 'Kampanya hakkında detaylı bilgi alabilir miyim?',
    date: '2025-05-18',
    campaignName: 'Yaz İndirimi 2025',
    status: 'new',
    initialLetter: 'AY',
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    message: 'Premium üyelik avantajları nelerdir?',
    date: '2025-05-17',
    campaignName: 'Premium Üyelik Kampanyası',
    status: 'inProgress',
    response: 'Merhaba Zeynep Hanım, premium üyelik avantajları hakkında bilgileri paylaştım.',
    initialLetter: 'ZK',
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    message: 'Randevu alabilir miyim?',
    date: '2025-05-15',
    campaignName: 'Müşteri Sadakat Programı',
    status: 'appointment',
    initialLetter: 'MD',
  },
  {
    id: 4,
    customerName: 'Ayşe Yıldız',
    message: 'Bu ürün hakkında detaylı bilgi istiyorum.',
    date: '2025-05-14',
    campaignName: 'Yeni Ürün Lansmanı',
    status: 'completed',
    response: 'Merhaba Ayşe Hanım, ürün detaylarını paylaştım. İyi günler.',
    initialLetter: 'AY',
  },
  {
    id: 5,
    customerName: 'Mustafa Şahin',
    message: 'Siparişimi onayladım.',
    date: '2025-05-12',
    campaignName: 'Yaz İndirimi 2025',
    status: 'sold',
    initialLetter: 'MŞ',
  }
];

const BrandMessages: React.FC = () => {
  const [messages, setMessages] = useState<CustomerMessage[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const uniqueCampaigns = [...new Set(messages.map(msg => msg.campaignName))];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    const matchesTab = activeTab === 'all' || message.status === activeTab;
    
    return matchesSearch && matchesCampaign && matchesTab;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Yeni</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">İlgileniyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Randevu</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  // Mesaj detaylarını görüntüleme
  const handleViewMessage = (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    setResponseText(message.response || '');
  };

  // Mesaj yanıtlama
  const handleSendResponse = () => {
    if (!selectedMessage || responseText.trim() === '') return;

    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === selectedMessage.id);
    
    if (messageIndex !== -1) {
      updatedMessages[messageIndex].response = responseText;
      updatedMessages[messageIndex].status = 'inProgress';  // Durum değiştirme
      setMessages(updatedMessages);
      setResponseText('');
      setIsDialogOpen(false);
    }
  };

  // Mesaj durumunu değiştirme
  const changeMessageStatus = (messageId: number, newStatus: CustomerMessage['status']) => {
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      updatedMessages[messageIndex].status = newStatus;
      setMessages(updatedMessages);
      
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({...selectedMessage, status: newStatus});
      }
    }
  };

  // Get count by status
  const getCountByStatus = (status: string) => {
    if (status === 'all') {
      return messages.length;
    }
    return messages.filter(msg => msg.status === status).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Müşteri Mesajları</h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Mesajlarda ara..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Tüm Kampanyalar" />
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

      {/* Status Tabs */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="flex overflow-x-auto scrollbar-hide">
          <Button
            variant={activeTab === 'all' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('all')}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Tümü</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('all')}</Badge>
          </Button>
          <Button
            variant={activeTab === 'new' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('new')}
          >
            <AlertCircle className="h-4 w-4" />
            <span>Yeni</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('new')}</Badge>
          </Button>
          <Button
            variant={activeTab === 'inProgress' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('inProgress')}
          >
            <User className="h-4 w-4" />
            <span>İlgileniyor</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('inProgress')}</Badge>
          </Button>
          <Button
            variant={activeTab === 'appointment' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('appointment')}
          >
            <Calendar className="h-4 w-4" />
            <span>Randevu</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('appointment')}</Badge>
          </Button>
          <Button
            variant={activeTab === 'completed' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('completed')}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Tamamlandı</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('completed')}</Badge>
          </Button>
          <Button
            variant={activeTab === 'sold' ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent px-4 py-2 flex gap-2 items-center"
            onClick={() => setActiveTab('sold')}
          >
            <Check className="h-4 w-4" />
            <span>Satıldı</span>
            <Badge variant="outline" className="ml-1">{getCountByStatus('sold')}</Badge>
          </Button>
        </div>
        
        {/* Message List */}
        <div className="divide-y">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(message => (
              <div 
                key={message.id} 
                className="p-4 hover:bg-slate-50 cursor-pointer flex items-start gap-3"
                onClick={() => handleViewMessage(message)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {message.initialLetter || message.customerName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.customerName}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(message.date)}
                      </div>
                      {getStatusBadge(message.status)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                      {message.campaignName}
                    </span>
                    {message.response && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Yanıtlandı
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-xl font-medium">Mesaj bulunamadı</h3>
              <p className="text-muted-foreground">Bu kriterlere uygun mesaj bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mesaj Detay Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedMessage.initialLetter || selectedMessage.customerName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-lg">{selectedMessage.customerName}</DialogTitle>
                      <DialogDescription className="text-sm flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {formatDate(selectedMessage.date)} 
                        <span>•</span> 
                        {selectedMessage.campaignName}
                      </DialogDescription>
                    </div>
                  </div>
                  {getStatusBadge(selectedMessage.status)}
                </div>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm">{selectedMessage.message}</p>
                  </CardContent>
                </Card>
                
                {selectedMessage.response ? (
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Yanıtınız:</span>
                      </div>
                      <p className="text-sm">{selectedMessage.response}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Yanıtınız:</label>
                      <Input
                        placeholder="Yanıtınızı yazın..."
                        className="min-h-[80px] py-2"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center gap-2">
                  <Select 
                    value={selectedMessage.status} 
                    onValueChange={(value) => changeMessageStatus(
                      selectedMessage.id, 
                      value as CustomerMessage['status']
                    )}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Yeni</SelectItem>
                      <SelectItem value="inProgress">İlgileniyor</SelectItem>
                      <SelectItem value="appointment">Randevu</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                      <SelectItem value="sold">Satıldı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {!selectedMessage.response && (
                  <Button onClick={handleSendResponse} disabled={responseText.trim() === ''}>
                    Yanıtla
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandMessages;
