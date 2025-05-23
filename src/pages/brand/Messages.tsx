import React, { useState } from 'react';
import { Search, MessageSquare, Filter, Check, Send, AlertCircle } from 'lucide-react';
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

// Mock data
interface CustomerMessage {
  id: number;
  customerName: string;
  message: string;
  date: string;
  campaignName: string;
  status: 'new' | 'inProgress' | 'appointment' | 'completed' | 'sold';
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

type StatusColumnIds = keyof typeof statusColumns;

const BrandMessages: React.FC = () => {
  const [messages, setMessages] = useState<CustomerMessage[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');

  const uniqueCampaigns = [...new Set(messages.map(msg => msg.campaignName))];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCampaign = campaignFilter === 'all' || message.campaignName === campaignFilter;
    
    return matchesSearch && matchesCampaign;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Müşteri Mesajları</h1>
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
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
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

      {/* Sürükle-Bırak Alanı */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {Object.entries(statusColumns).map(([statusId, column]) => (
            <div 
              key={statusId}
              className="bg-slate-50 rounded-lg p-4 border"
            >
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-${column.color}-500`}></span>
                {column.title}
                <Badge className="ml-auto">{getMessagesForStatus(statusId as StatusColumnIds).length}</Badge>
              </h3>
              
              <Droppable droppableId={statusId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? 'bg-slate-100' : 'bg-transparent'
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
                            className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                            onClick={() => handleViewMessage(message)}
                          >
                            <CardHeader className="p-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(message.customerName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-sm">{message.customerName}</CardTitle>
                                  <CardDescription className="text-xs">{formatDate(message.date)}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="px-3 py-2">
                              <p className="text-xs line-clamp-2">{message.message}</p>
                            </CardContent>
                            <CardFooter className="px-3 py-2 border-t flex justify-between items-center">
                              <span className="text-xs">{message.campaignName}</span>
                              {message.response ? (
                                <Badge variant="outline" className="text-xs">Yanıtlandı</Badge>
                              ) : null}
                            </CardFooter>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {getMessagesForStatus(statusId as StatusColumnIds).length === 0 && (
                      <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded border border-dashed">
                        <p className="text-xs text-muted-foreground">Mesaj yok</p>
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
        <DialogContent className="max-w-xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(selectedMessage.customerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-lg">{selectedMessage.customerName}</DialogTitle>
                      <DialogDescription className="text-sm">
                        {formatDate(selectedMessage.date)} • {selectedMessage.campaignName}
                      </DialogDescription>
                    </div>
                  </div>
                  {getStatusBadge(selectedMessage.status)}
                </div>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
                
                {selectedMessage.response ? (
                  <div className="bg-primary/5 p-4 rounded-md border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">Yanıtınız:</span>
                    </div>
                    <p className="text-sm">{selectedMessage.response}</p>
                  </div>
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
                    <Send className="mr-2 h-4 w-4" /> Yanıtla
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