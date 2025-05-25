
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
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 font-medium text-xs">Yeni Mesaj</Badge>;
      case 'inProgress':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 font-medium text-xs">İlgileniliyor</Badge>;
      case 'appointment':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 font-medium text-xs">Randevu Alındı</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 font-medium text-xs">Tamamlandı</Badge>;
      case 'sold':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-medium text-xs">Satıldı</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
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
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-200 bg-white ${
            snapshot.isDragging ? 'shadow-2xl scale-105 rotate-2 z-50' : 'hover:border-slate-300'
          }`}
          onClick={() => onClick(message)}
        >
          <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-sm">
                  <AvatarFallback className={`${getStatusColor(message.status)} text-white text-xs sm:text-sm font-medium`}>
                    {getInitials(message.customerName)}
                  </AvatarFallback>
                </Avatar>
                {message.status === 'new' && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 text-sm sm:text-base truncate">
                  {message.customerName}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 sm:mt-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>{formatDate(message.date)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="scale-75 sm:scale-100 origin-top-right">
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
          
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <p className="text-sm text-slate-700 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {message.message}
            </p>
          </CardContent>
          
          <CardFooter className="p-3 sm:p-4 pt-0 border-t border-slate-100 bg-slate-50/50">
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded border truncate max-w-[150px] sm:max-w-none">
                  {message.campaignName}
                </span>
              </div>
              
              {message.tags && message.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {message.tags.slice(0, window.innerWidth < 640 ? 1 : 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 bg-white/80 border-slate-200">
                      <Tag className="h-2.5 w-2.5 mr-1" />
                      <span className="truncate max-w-[60px] sm:max-w-none">{tag}</span>
                    </Badge>
                  ))}
                  {message.tags.length > (window.innerWidth < 640 ? 1 : 2) && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-white/80 border-slate-200">
                      +{message.tags.length - (window.innerWidth < 640 ? 1 : 2)}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};

export default MessageCard;
