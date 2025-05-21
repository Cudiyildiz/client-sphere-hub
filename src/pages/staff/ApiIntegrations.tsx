
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock brand data
const brands = [
  { id: '1', name: 'Akme Şirket' },
  { id: '2', name: 'Tech Çözümleri' },
  { id: '3', name: 'Global Yiyecek' },
  { id: '4', name: 'Şehir Modası' },
];

// Mock API services
const apiServices = [
  { id: 'zapier', name: 'Zapier', description: 'Connect with thousands of apps', icon: '🔌' },
  { id: 'slack', name: 'Slack', description: 'Team communication platform', icon: '💬' },
  { id: 'mailchimp', name: 'Mailchimp', description: 'Email marketing service', icon: '📧' },
  { id: 'hubspot', name: 'HubSpot', description: 'CRM platform', icon: '🔄' },
  { id: 'google_analytics', name: 'Google Analytics', description: 'Web analytics service', icon: '📊' },
  { id: 'stripe', name: 'Stripe', description: 'Online payment processing', icon: '💳' },
];

interface ApiConnection {
  id: string;
  brandId: string;
  serviceId: string;
  apiKey: string;
  webhookUrl?: string;
  status: 'active' | 'pending' | 'error';
  createdAt: Date;
}

const ApiIntegrations: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [connections, setConnections] = useState<ApiConnection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  // Filter connections for the selected brand
  const brandConnections = connections.filter(conn => conn.brandId === selectedBrand);
  
  const handleConnect = () => {
    if (!selectedBrand || !selectedService || !apiKey) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen marka, API servisi ve API anahtarı bilgilerini doldurunuz.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsConnecting(true);
    setConnectionStatus('idle');
    
    // Simulate API connection process
    setTimeout(() => {
      const newConnection: ApiConnection = {
        id: Date.now().toString(),
        brandId: selectedBrand,
        serviceId: selectedService,
        apiKey: apiKey,
        webhookUrl: webhookUrl,
        status: 'active',
        createdAt: new Date(),
      };
      
      setConnections([...connections, newConnection]);
      setApiKey('');
      setWebhookUrl('');
      setSelectedService('');
      setIsConnecting(false);
      setConnectionStatus('success');
      
      toast({
        title: 'Bağlantı Başarılı',
        description: `${brands.find(b => b.id === selectedBrand)?.name} için API bağlantısı kuruldu.`,
      });
    }, 1500);
  };
  
  const handleDelete = (connectionId: string) => {
    setConnections(connections.filter(conn => conn.id !== connectionId));
    toast({
      title: 'Bağlantı Silindi',
      description: 'API bağlantısı başarıyla silindi.',
    });
  };
  
  const getServiceDetails = (serviceId: string) => {
    return apiServices.find(service => service.id === serviceId);
  };
  
  const navigateToConnectTab = () => {
    const tabElement = document.querySelector('[data-value="connect"]');
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">API Entegrasyonları</h1>
        <Button
          onClick={() => {
            setSelectedService('');
            setApiKey('');
            setWebhookUrl('');
            setConnectionStatus('idle');
          }}
          variant="outline"
        >
          Formu Temizle
        </Button>
      </div>
      
      <Tabs defaultValue="connect" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connect">Bağlantı Ekle</TabsTrigger>
          <TabsTrigger value="manage">Bağlantıları Yönet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yeni API Bağlantısı</CardTitle>
              <CardDescription>
                Marka için yeni bir API servisi bağlantısı oluşturun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marka Seçin</Label>
                <Select
                  value={selectedBrand}
                  onValueChange={(value) => {
                    setSelectedBrand(value);
                    setConnectionStatus('idle');
                  }}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Marka seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedBrand && (
                <div className="space-y-2">
                  <Label htmlFor="api-service">API Servisi</Label>
                  <Select
                    value={selectedService}
                    onValueChange={(value) => {
                      setSelectedService(value);
                      setConnectionStatus('idle');
                    }}
                  >
                    <SelectTrigger id="api-service">
                      <SelectValue placeholder="API servisi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center gap-2">
                            <span>{service.icon}</span>
                            <span>{service.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedBrand && selectedService && (
                <div className="space-y-4 border rounded-md p-4 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {getServiceDetails(selectedService)?.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold">{getServiceDetails(selectedService)?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getServiceDetails(selectedService)?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Anahtarı</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="API anahtarını girin"
                    />
                  </div>
                  
                  {selectedService === 'zapier' && (
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL (İsteğe bağlı)</Label>
                      <Input
                        id="webhook-url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="Webhook URL'ini girin"
                      />
                    </div>
                  )}
                  
                  {connectionStatus === 'success' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <AlertTitle>Bağlantı Başarılı</AlertTitle>
                      <AlertDescription>
                        API servisi başarıyla bağlandı. Artık bu bağlantıyı kullanabilirsiniz.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {connectionStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Bağlantı Hatası</AlertTitle>
                      <AlertDescription>
                        API bağlantısı sırasında bir hata oluştu. Lütfen bilgileri kontrol edip tekrar deneyin.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    className="w-full" 
                    onClick={handleConnect} 
                    disabled={!apiKey || isConnecting}
                  >
                    {isConnecting ? "Bağlanıyor..." : "Bağlantıyı Kur"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mevcut Bağlantılar</CardTitle>
              <CardDescription>
                Markalara ait API bağlantılarını görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filter-brand">Marka Filtrele</Label>
                  <Select
                    value={selectedBrand}
                    onValueChange={setSelectedBrand}
                  >
                    <SelectTrigger id="filter-brand">
                      <SelectValue placeholder="Marka seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedBrand ? (
                  brandConnections.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold">{brands.find(b => b.id === selectedBrand)?.name} Bağlantıları</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {brandConnections.map((connection) => {
                          const service = getServiceDetails(connection.serviceId);
                          return (
                            <Card key={connection.id} className="overflow-hidden">
                              <CardHeader className="bg-slate-50 pb-2">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">{service?.icon}</span>
                                    <CardTitle className="text-lg">{service?.name}</CardTitle>
                                  </div>
                                  <Badge variant={connection.status === 'active' ? 'default' : 'outline'}>
                                    {connection.status === 'active' ? 'Aktif' : connection.status === 'pending' ? 'Beklemede' : 'Hata'}
                                  </Badge>
                                </div>
                                <CardDescription className="mt-1">
                                  {service?.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Bağlantı Tarihi:</span>
                                    <span>{connection.createdAt.toLocaleDateString('tr-TR')}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">API Anahtarı:</span>
                                    <span>•••••••{connection.apiKey.slice(-4)}</span>
                                  </div>
                                  
                                  <div className="flex justify-end mt-4">
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleDelete(connection.id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" /> Sil
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center border rounded-md bg-slate-50">
                      <p className="text-lg mb-2">Bu marka için henüz API bağlantısı bulunmuyor.</p>
                      <Button onClick={navigateToConnectTab}>
                        <Plus className="h-4 w-4 mr-1" /> Bağlantı Ekle
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center border rounded-md bg-slate-50">
                    <p className="mb-2">Lütfen bağlantıları görüntülemek için bir marka seçin</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegrations;
