import React, { useState } from 'react';
import { Search, MessageSquare, Filter, Check, Send, AlertCircle, Calendar, Clock, Tag, ChevronDown, RefreshCw, X, User, Reply, MoreVertical } from 'lucide-react';
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data
interface CustomerMessage {
  id: number;
  customerName: string;
  message: string;
  date: string;
  campaignName: string;
  status: 'new' | 'inProgress' | 'appointment' | 'completed' | 'sold';
  responses?: string[];
  tags?: string[];
}

const mockMessages: CustomerMessage[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    message: 'Kampanya hakkında detaylı bilgi alabilir miyim?',
    date: '2025-05-18',
    campaignName: 'Yaz İndirimi 2025',
    status: 'new',
    tags: ['Yeni Müşteri', 'Premium']
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    message: 'Premium üyelik avantajları nelerdir?',
    date: '2025-05-17',
    campaignName: 'Premium Üyelik Kampanyası',
    status: 'inProgress',
    responses: ['Merhaba Zeynep Hanım, premium üyelik avantajları hakkında bilgileri paylaştım.'],
    tags: ['Premium', 'Düzenli Müşteri']
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    message: 'Randevu alabilir miyim?',
    date: '2025-04-15',
    campaignName: 'Müşteri Sadakat Programı',
    status: 'appointment',
    tags: ['VIP', 'Randevu']
  },
  {
    id: 4,
    customerName: 'Ayşe Yıldız',
    message: 'Bu ürün hakkında detaylı bilgi istiyorum.',
    date: '2025-04-14',
    campaignName: 'Yeni Ürün Lansmanı',
    status: 'completed',
    responses: ['Merhaba Ayşe Hanım, ürün detaylarını paylaştım. İyi günler.', 'Size özel indirim kodunuzu da iletmek isterim: AYSE15'],
    tags: ['Yeni Müşteri']
  },
  {
    id: 5,
    customerName: 'Mustafa Şahin',
    message: 'Siparişimi onayladım.',
    date: '2025-03-12',
    campaignName: 'Yaz İndirimi 2025',
    status: 'sold',
    tags: ['Düzenli Müşteri', 'B2B']
  }
];

// Durum kategorileri
const statusColumns = {
  new: {
    id: 'new',
    title: 'Yeni',
    color: 'blue'
  },
  inProgress: {
    id: 'inProgress',
    title: 'İlgileniyor',
    color: 'yellow'
  },
  appointment: {
    id: 'appointment',
    title: 'Randevu',
    color: 'purple'
  },
  completed: {
    id: 'completed',
    title: 'Tamamlandı',
    color: 'green'
  },
  sold: {
    id: 'sold',
    title: 'Satıldı',
    color: 'emerald'
  }
};

// Tarih aralığı seçenekleri
const dateRangeOptions = [
  { value: 'all', label: 'Tüm Zamanlar' },
  { value: 'today', label: 'Bugün' },
  { value: 'yesterday', label: 'Dün' },
  { value: 'thisWeek', label: 'Bu Hafta' },
  { value: 'lastWeek', label: 'Geçen Hafta' },
  { value: 'thisMonth', label: 'Bu Ay' },
  { value: 'lastMonth', label: 'Geçen Ay' },
  { value: 'last3Months', label: 'Son 3 Ay' },
  { value: 'last6Months', label: 'Son 6 Ay' },
];

// Müşteri etiketleri
const availableTags = [
  'Yeni Müşteri',
  'Premium',
  'VIP',
  'Düzenli Müşteri',
  'B2B',
  'Randevu',
];

type StatusColumnIds = keyof typeof statusColumns;

const BrandMessages: React.FC = () => {
  const [messages, setMessages] = useState<CustomerMessage[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const uniqueCampaigns = [...new Set(messages.map(msg => msg.campaignName))];
  const uniqueTags = [...new Set(messages.flatMap(msg => msg.tags || []))];

  // Tarih filtrelemesi için yardımcı fonksiyon
  const isDateInRange = (dateStr: string, range: string): boolean => {
    const today = new Date();
    const date = new Date(dateStr);
    
    switch (range) {
      case 'today':
        return date.toDateString() === today.toDateString();
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      case 'thisWeek':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return date >= weekStart;
      case 'lastWeek':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
        return date >= lastWeekStart && date <= lastWeekEnd;
      case 'thisMonth':
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case 'lastMonth': 
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      case 'last3Months':
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        return date >= threeMonthsAgo;
      case 'last6Months':
        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return date >= sixMonthsAgo;
      default:
        return true; // 'all' veya diğer durumlar için tüm tarihleri kabul et
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    const matchesDateRange = dateRangeFilter === 'all' || isDateInRange(message.date, dateRangeFilter);
    const matchesTag = tagFilter === 'all' || (message.tags && message.tags.includes(tagFilter));
    
    return matchesSearch && matchesCampaign && matchesDateRange && matchesTag;
  });

  // Her durum için ilgili mesajları getirme
  const getMessagesForStatus = (status: StatusColumnIds) => {
    return filteredMessages.filter(message => message.status === status);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // İsim başharflerini alma
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 font-medium">Yeni Mesaj</Badge>;
      case 'inProgress':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-medium">İlgileniliyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 font-medium">Randevu Alındı</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 font-medium">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-medium">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  // Sürükle-bırak olayını işleme
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Eğer hedef yoksa veya aynı yere bırakıldıysa bir şey yapma
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // Mesaj ID'sini alıp mesajı bul
    const messageId = parseInt(draggableId.replace('message-', ''));
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      // Mesajın durumunu güncelle
      updatedMessages[messageIndex].status = destination.droppableId as StatusColumnIds;
      setMessages(updatedMessages);
    }
  };

  // Mesaj detaylarını görüntüleme
  const handleViewMessage = (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    setResponseText('');  // Yanıt metnini sıfırla
  };

  // Mesaj yanıtlama
  const handleSendResponse = () => {
    if (!selectedMessage || responseText.trim() === '') return;

    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === selectedMessage.id);
    
    if (messageIndex !== -1) {
      if (!updatedMessages[messageIndex].responses) {
        updatedMessages[messageIndex].responses = [];
      }
      
      updatedMessages[messageIndex].responses!.push(responseText);
      updatedMessages[messageIndex].status = 'inProgress';  // Durum değiştirme
      
      setMessages(updatedMessages);
      setSelectedMessage({
        ...selectedMessage,
        responses: [...(selectedMessage.responses || []), responseText],
        status: 'inProgress'
      });
      setResponseText('');
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

  // Müşteriye etiket ekleme veya çıkarma
  const toggleCustomerTag = (messageId: number, tagName: string) => {
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      if (!updatedMessages[messageIndex].tags) {
        updatedMessages[messageIndex].tags = [];
      }

      const currentTags = updatedMessages[messageIndex].tags!;
      const tagIndex = currentTags.indexOf(tagName);
      
      if (tagIndex > -1) {
        // Etiketi çıkar
        currentTags.splice(tagIndex, 1);
      } else {
        // Etiketi ekle
        currentTags.push(tagName);
      }
      
      setMessages(updatedMessages);
      
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({...selectedMessage, tags: [...currentTags]});
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Müşteri Mesajları</h1>
            <p className="text-slate-600 mt-1">Müşterilerinizle iletişimi yönetin</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Mesajlarda ara..." 
              className="pl-10 bg-white border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Popover open={isFiltersOpen} onValueChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white border-slate-200">
                <Filter className="h-4 w-4" />
                <span>Filtreler</span>
                <Badge className="ml-1 bg-primary/10 text-primary">
                  {(campaignFilter !== 'all' ? 1 : 0) + 
                   (dateRangeFilter !== 'all' ? 1 : 0) + 
                   (tagFilter !== 'all' ? 1 : 0)}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filtreleme Seçenekleri</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kampanya</label>
                  <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                    <SelectTrigger className="w-full">
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarih Aralığı</label>
                  <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tarih Aralığı" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dateRangeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Müşteri Etiketi</label>
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Müşteri Etiketi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Tüm Etiketler</SelectItem>
                        {uniqueTags.map(tag => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setCampaignFilter('all');
                      setDateRangeFilter('all');
                      setTagFilter('all');
                    }}
                  >
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Filtreleri Sıfırla
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setIsFiltersOpen(false)}
                  >
                    Uygula
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Aktif filtre bilgisi */}
        {(campaignFilter !== 'all' || dateRangeFilter !== 'all' || tagFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-sm text-slate-600">Aktif filtreler:</span>
            
            {campaignFilter !== 'all' && (
              <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
                <span>{campaignFilter}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => setCampaignFilter('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {dateRangeFilter !== 'all' && (
              <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
                <span>{dateRangeOptions.find(o => o.value === dateRangeFilter)?.label}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => setDateRangeFilter('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {tagFilter !== 'all' && (
              <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
                <Tag className="h-3 w-3 mr-1" />
                <span>{tagFilter}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => setTagFilter('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}

        {/* Sürükle-Bırak Alanı */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Object.entries(statusColumns).map(([statusId, column]) => (
              <div 
                key={statusId}
                className="bg-white rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${column.color}-500`}></div>
                    <span>{column.title}</span>
                  </h3>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs px-2 py-1">
                    {getMessagesForStatus(statusId as StatusColumnIds).length}
                  </Badge>
                </div>
                
                <Droppable droppableId={statusId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[400px] space-y-3 transition-colors duration-200 ${
                        snapshot.isDraggingOver ? 'bg-slate-50 rounded-lg p-2' : ''
                      }`}
                    >
                      {getMessagesForStatus(statusId as StatusColumnIds).map((message, index) => (
                        <Draggable 
                          key={message.id} 
                          draggableId={`message-${message.id}`} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`cursor-pointer transition-all duration-200 hover:shadow-md border-slate-200 ${
                                snapshot.isDragging ? 'shadow-lg scale-105 rotate-2' : ''
                              }`}
                              onClick={() => handleViewMessage(message)}
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                  <div className="relative">
                                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                      <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                                        {getInitials(message.customerName)}
                                      </AvatarFallback>
                                    </Avatar>
                                    {message.status === 'new' && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-slate-900 text-sm truncate">
                                      {message.customerName}
                                    </h4>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{formatDate(message.date)}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <div className="scale-75 origin-top-right">
                                      {getStatusBadge(message.status)}
                                    </div>
                                    {message.responses && message.responses.length > 0 && (
                                      <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <Reply className="h-3 w-3" />
                                        <span>{message.responses.length}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              
                              <CardContent className="pt-0 pb-3">
                                <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                                  {message.message}
                                </p>
                              </CardContent>
                              
                              <CardFooter className="pt-0 border-t border-slate-100 bg-slate-50/50 py-3">
                                <div className="w-full space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded border truncate">
                                      {message.campaignName}
                                    </span>
                                  </div>
                                  
                                  {message.tags && message.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {message.tags.slice(0, 2).map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 bg-white/80 border-slate-200">
                                          <Tag className="h-2.5 w-2.5 mr-1" />
                                          <span className="truncate">{tag}</span>
                                        </Badge>
                                      ))}
                                      {message.tags.length > 2 && (
                                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-white/80 border-slate-200">
                                          +{message.tags.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </CardFooter>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {getMessagesForStatus(statusId as StatusColumnIds).length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                            <MessageSquare className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-500 font-medium">Mesaj yok</p>
                          <p className="text-xs text-slate-400 mt-1 text-center">Bu durumda mesaj bulunmuyor</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Mesaj Detay Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(selectedMessage.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <DialogTitle className="text-lg">{selectedMessage.customerName}</DialogTitle>
                        <DialogDescription className="text-sm flex items-center gap-2 flex-wrap">
                          <Calendar className="h-4 w-4" />
                          {formatDate(selectedMessage.date)} 
                          <span className="text-muted-foreground mx-1">•</span>
                          <span className="truncate">{selectedMessage.campaignName}</span>
                        </DialogDescription>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-slate-600" />
                      <span className="text-sm font-medium">Müşteri Mesajı:</span>
                      <span className="ml-auto text-xs text-slate-500">{formatDate(selectedMessage.date)}</span>
                    </div>
                    <p className="text-base">{selectedMessage.message}</p>
                  </div>
                  
                  {/* Etiketler */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Müşteri Etiketleri
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedMessage.tags?.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:opacity-80 flex items-center gap-1"
                          onClick={() => toggleCustomerTag(selectedMessage.id, tag)}
                        >
                          {selectedMessage.tags?.includes(tag) && <Check className="h-3 w-3 mr-1" />}
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Yanıtlar */}
                  {selectedMessage.responses && selectedMessage.responses.length > 0 && (
                    <Accordion type="single" collapsible className="bg-primary/5 rounded-lg border">
                      <AccordionItem value="responses" className="border-0">
                        <AccordionTrigger className="px-4 py-2">
                          <span className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Yanıtlar ({selectedMessage.responses.length})
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-3">
                            {selectedMessage.responses.map((response, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border">
                                <div className="flex items-center gap-2 mb-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                      MRK
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-slate-500">
                                    {index === 0 ? 'İlk yanıt' : `${index + 1}. yanıt`}
                                  </span>
                                </div>
                                <p className="text-sm">{response}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                  
                  {/* Yeni Yanıt Girişi */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Yeni Yanıt Ekle
                      </label>
                      <Input
                        placeholder="Yanıtınızı yazın..."
                        className="min-h-[80px] py-2"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between space-y-2 lg:space-y-0 gap-2">
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <Select 
                      value={selectedMessage.status} 
                      onValueChange={(value) => changeMessageStatus(
                        selectedMessage.id, 
                        value as CustomerMessage['status']
                      )}
                    >
                      <SelectTrigger className="w-full lg:w-[140px]">
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
                  
                  <Button 
                    onClick={handleSendResponse} 
                    disabled={responseText.trim() === ''}
                    className="gap-2 w-full lg:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Yanıt Gönder
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BrandMessages;
