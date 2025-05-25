
import React from 'react';
import { Calendar, User, MessageSquare, Tag, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

interface MessageDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  selectedMessage: CustomerMessage | null;
  responseText: string;
  setResponseText: (text: string) => void;
  onSendResponse: () => void;
  onChangeStatus: (messageId: number, status: CustomerMessage['status']) => void;
  onToggleTag: (messageId: number, tag: string) => void;
  availableTags: string[];
}

const MessageDialog: React.FC<MessageDialogProps> = ({
  isOpen,
  onClose,
  selectedMessage,
  responseText,
  setResponseText,
  onSendResponse,
  onChangeStatus,
  onToggleTag,
  availableTags
}) => {
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

  if (!selectedMessage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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
          
          {/* Tags */}
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
                  onClick={() => onToggleTag(selectedMessage.id, tag)}
                >
                  {selectedMessage.tags?.includes(tag) && <Check className="h-3 w-3 mr-1" />}
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Responses */}
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
          
          {/* New Response Input */}
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
              onValueChange={(value) => onChangeStatus(
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
            onClick={onSendResponse} 
            disabled={responseText.trim() === ''}
            className="gap-2 w-full lg:w-auto"
          >
            <Send className="h-4 w-4" />
            Yanıt Gönder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
