
import React from 'react';
import { Calendar, Reply, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Draggable } from 'react-beautiful-dnd';

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

interface MessageCardProps {
  message: CustomerMessage;
  index: number;
  onClick: (message: CustomerMessage) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, index, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 font-medium text-xs px-2 py-1">Yeni Mesaj</Badge>;
      case 'inProgress':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 font-medium text-xs px-2 py-1">İlgileniliyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 font-medium text-xs px-2 py-1">Randevu Alındı</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 font-medium text-xs px-2 py-1">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-medium text-xs px-2 py-1">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const getAvatarColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'inProgress':
        return 'bg-amber-500';
      case 'appointment':
        return 'bg-purple-500';
      case 'completed':
        return 'bg-green-500';
      case 'sold':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
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
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border border-gray-200 bg-white rounded-xl ${
            snapshot.isDragging ? 'shadow-2xl scale-105 rotate-1 z-50' : 'hover:border-gray-300'
          }`}
          onClick={() => onClick(message)}
        >
          <CardHeader className="p-4 pb-3">
            <div className="flex items-start gap-3">
              <Avatar className={`h-12 w-12 ${getAvatarColor(message.status)} flex-shrink-0`}>
                <AvatarFallback className={`${getAvatarColor(message.status)} text-white text-sm font-semibold`}>
                  {getInitials(message.customerName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base truncate">
                      {message.customerName}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <span>{formatDate(message.date)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {getStatusBadge(message.status)}
                    {message.responses && message.responses.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Reply className="h-3 w-3" />
                        <span>{message.responses.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed mb-4">
              {message.message}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded border text-center flex-1 mr-2">
                  {message.campaignName}
                </span>
              </div>
              
              {message.tags && message.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {message.tags.slice(0, 2).map(tag => (
                    <div key={tag} className="flex items-center gap-1 bg-white border border-gray-200 rounded px-2 py-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600 font-medium">{tag}</span>
                    </div>
                  ))}
                  {message.tags.length > 2 && (
                    <div className="flex items-center bg-white border border-gray-200 rounded px-2 py-1">
                      <span className="text-xs text-gray-600 font-medium">+{message.tags.length - 2}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default MessageCard;
