import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import FilterPanel from './components/FilterPanel';
import StatusColumn from './components/StatusColumn';
import MessageDialog from './components/MessageDialog';

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

// Status columns configuration
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

// Date range options
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

// Available customer tags
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

  // Date filtering helper function
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
        return true;
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

  // Get messages for each status
  const getMessagesForStatus = (status: StatusColumnIds) => {
    return filteredMessages.filter(message => message.status === status);
  };

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const messageId = parseInt(draggableId.replace('message-', ''));
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      updatedMessages[messageIndex].status = destination.droppableId as StatusColumnIds;
      setMessages(updatedMessages);
    }
  };

  // Handle message click
  const handleViewMessage = (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    setResponseText('');
  };

  // Send response - Fixed to prevent duplicate responses
  const handleSendResponse = () => {
    if (!selectedMessage || responseText.trim() === '') return;

    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(msg => msg.id === selectedMessage.id);
    
    if (messageIndex !== -1) {
      if (!updatedMessages[messageIndex].responses) {
        updatedMessages[messageIndex].responses = [];
      }
      
      updatedMessages[messageIndex].responses!.push(responseText);
      updatedMessages[messageIndex].status = 'inProgress';
      
      setMessages(updatedMessages);
      
      // Update selectedMessage with the updated message from the array
      setSelectedMessage(updatedMessages[messageIndex]);
      setResponseText('');
    }
  };

  // Change message status
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

  // Toggle customer tag
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
        currentTags.splice(tagIndex, 1);
      } else {
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
      <div className="max-w-full mx-auto p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Müşteri Mesajları</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Müşterilerinizle iletişimi yönetin</p>
          </div>
        </div>

        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          campaignFilter={campaignFilter}
          setCampaignFilter={setCampaignFilter}
          dateRangeFilter={dateRangeFilter}
          setDateRangeFilter={setDateRangeFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          uniqueCampaigns={uniqueCampaigns}
          uniqueTags={uniqueTags}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          dateRangeOptions={dateRangeOptions}
        />

        {/* Drag and Drop Area */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 min-h-[400px]">
            {Object.entries(statusColumns).map(([statusId, column]) => (
              <StatusColumn
                key={statusId}
                statusId={statusId}
                column={column}
                messages={getMessagesForStatus(statusId as StatusColumnIds)}
                onMessageClick={handleViewMessage}
              />
            ))}
          </div>
        </DragDropContext>

        <MessageDialog
          isOpen={isDialogOpen}
          onClose={setIsDialogOpen}
          selectedMessage={selectedMessage}
          responseText={responseText}
          setResponseText={setResponseText}
          onSendResponse={handleSendResponse}
          onChangeStatus={changeMessageStatus}
          onToggleTag={toggleCustomerTag}
          availableTags={availableTags}
        />
      </div>
    </div>
  );
};

export default BrandMessages;
