
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Droppable } from 'react-beautiful-dnd';
import MessageCard from './MessageCard';

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

interface StatusColumnProps {
  statusId: string;
  column: {
    id: string;
    title: string;
    color: string;
  };
  messages: CustomerMessage[];
  onMessageClick: (message: CustomerMessage) => void;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ statusId, column, messages, onMessageClick }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 sm:p-4 min-w-[280px] sm:min-w-[320px]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-${column.color}-500`}></div>
          <span className="truncate">{column.title}</span>
        </h3>
        <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs px-2 py-1 flex-shrink-0">
          {messages.length}
        </Badge>
      </div>
      
      <Droppable droppableId={statusId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[300px] sm:min-h-[400px] space-y-3 transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-slate-50 rounded-lg p-2' : ''
            }`}
          >
            {messages.map((message, index) => (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
                onClick={onMessageClick}
              />
            ))}
            {provided.placeholder}
            
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-500">Mesaj yok</p>
                <p className="text-xs text-slate-400 mt-1 text-center">Bu durumda mesaj bulunmuyor</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StatusColumn;
