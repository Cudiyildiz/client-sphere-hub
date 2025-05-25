
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
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border-slate-200 ${
            snapshot.isDragging ? 'shadow-lg scale-105 rotate-2' : ''
          }`}
          onClick={() => onClick(message)}
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
  );
};

export default MessageCard;
