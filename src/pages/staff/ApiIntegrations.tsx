import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Settings, 
  Copy, 
  RefreshCw, 
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// API kategorileri
const apiCategories = [
  { id: 'e-commerce', name: 'E-Ticaret' },
  { id: 'analytics', name: 'Analitik' },
  { id: 'communication', name: 'İletişim' },
  { id: 'crm', name: 'CRM' },
  { id: 'marketing', name: 'Pazarlama' },
  { id: 'payment', name: 'Ödeme' },
];

// Mock brand data
const brands = [
  { id: '1', name: 'Akme Şirket' },
  { id: '2', name: 'Tech Çözümleri' },
  { id: '3', name: 'Global Yiyecek' },
  { id: '4', name: 'Şehir Modası' },
];

// Genişletilmiş API servisleri
const apiServices = [
  { 
    id: 'zapier', 
    name: 'Zapier', 
    description: 'Binlerce uygulamayla bağlantı kurun', 
    icon: '🔌',
    category: 'communication',
    endpoints: [
      { name: 'webhooks', description: 'Webhook entegrasyonu', isDefault: true },
      { name: 'oauth', description: 'OAuth kimlik doğrulama', isDefault: false }
    ]
  },
  { 
    id: 'slack', 
    name: 'Slack', 
    description: 'Takım iletişim platformu', 
    icon: '💬',
    category: 'communication',
    endpoints: [
      { name: 'messages', description: 'Mesaj gönderme', isDefault: true },
      { name: 'channels', description: 'Kanal yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'mailchimp', 
    name: 'Mailchimp', 
    description: 'E-posta pazarlama servisi', 
    icon: '📧',
    category: 'marketing',
    endpoints: [
      { name: 'campaigns', description: 'Kampanya yönetimi', isDefault: true },
      { name: 'lists', description: 'Liste yönetimi', isDefault: true },
      { name: 'templates', description: 'Şablon yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'hubspot', 
    name: 'HubSpot', 
    description: 'CRM platformu', 
    icon: '🔄',
    category: 'crm',
    endpoints: [
      { name: 'contacts', description: 'Kişi yönetimi', isDefault: true },
      { name: 'deals', description: 'Fırsat yönetimi', isDefault: false },
      { name: 'companies', description: 'Şirket yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'google_analytics', 
    name: 'Google Analytics', 
    description: 'Web analitik servisi', 
    icon: '📊',
    category: 'analytics',
    endpoints: [
      { name: 'reports', description: 'Rapor alma', isDefault: true },
      { name: 'events', description: 'Olay takibi', isDefault: false }
    ]
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    description: 'Online ödeme işlemleri', 
    icon: '💳',
    category: 'payment',
    endpoints: [
      { name: 'charges', description: 'Ücretlendirme', isDefault: true },
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: false },
      { name: 'subscriptions', description: 'Abonelik yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'shopify', 
    name: 'Shopify', 
    description: 'E-ticaret platformu', 
    icon: '🛒',
    category: 'e-commerce',
    endpoints: [
      { name: 'products', description: 'Ürün yönetimi', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'woocommerce', 
    name: 'WooCommerce', 
    description: 'WordPress e-ticaret eklentisi', 
    icon: '🛍️',
    category: 'e-commerce',
    endpoints: [
      { name: 'products', description: 'Ürün yönetimi', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'coupons', description: 'Kupon yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'facebook', 
    name: 'Facebook Ads', 
    description: 'Facebook reklam platformu', 
    icon: '👥',
    category: 'marketing',
    endpoints: [
      { name: 'campaigns', description: 'Kampanya yönetimi', isDefault: true },
      { name: 'audience', description: 'Hedef kitle yönetimi', isDefault: false }
    ]
  },
  { 
    id: 'twilio', 
    name: 'Twilio', 
    description: 'İletişim API platformu', 
    icon: '📱',
    category: 'communication',
    endpoints: [
      { name: 'sms', description: 'SMS gönderimi', isDefault: true },
      { name: 'voice', description: 'Sesli arama', isDefault: false }
    ]
  },
  { 
    id: 'salesforce', 
    name: 'Salesforce', 
    description: 'CRM ve bulut çözümleri', 
    icon: '☁️',
    category: 'crm',
    endpoints: [
      { name: 'contacts', description: 'Kişi yönetimi', isDefault: true },
      { name: 'opportunities', description: 'Fırsat yönetimi', isDefault: false },
      { name: 'accounts', description: 'Hesap yönetimi', isDefault: false }
    ]
  }
];

interface ApiEndpoint {
  id: string;
  name: string;
  enabled: boolean;
  custom_url?: string;
}

interface ApiConnection {
  id: string;
  brandId: string;
  brandName: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  apiKey: string;
  webhookUrl?: string;
  status: 'active' | 'pending' | 'error';
  createdAt: Date;
  lastChecked?: Date;
  endpoints: ApiEndpoint[];
  autoSync: boolean;
  syncInterval: string;
  customHeaders?: string;
}

// Örnek bağlantılar
const initialConnections: ApiConnection[] = [
  {
    id: '1',
    brandId: '1',
    brandName: 'Akme Şirket',
    serviceId: 'shopify',
    serviceName: 'Shopify',
    serviceIcon: '🛒',
    apiKey: 'sk_test_12345',
    status: 'active',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastChecked: new Date(),
    endpoints: [
      { id: 'shopify_products', name: 'products', enabled: true },
      { id: 'shopify_orders', name: 'orders', enabled: true }
    ],
    autoSync: true,
    syncInterval: 'daily'
  },
  {
    id: '2',
    brandId: '2',
    brandName: 'Tech Çözümleri',
    serviceId: 'google_analytics',
    serviceName: 'Google Analytics',
    serviceIcon: '📊',
    apiKey: 'ga_1234567890',
    status: 'active',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    lastChecked: new Date(),
    endpoints: [
      { id: 'ga_reports', name: 'reports', enabled: true }
    ],
    autoSync: true,
    syncInterval: 'weekly'
  },
  {
    id: '3',
    brandId: '3',
    brandName: 'Global Yiyecek',
    serviceId: 'mailchimp',
    serviceName: 'Mailchimp',
    serviceIcon: '📧',
    apiKey: 'mc_api_12345',
    status: 'error',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endpoints: [
      { id: 'mailchimp_campaigns', name: 'campaigns', enabled: true },
      { id: 'mailchimp_lists', name: 'lists', enabled: true }
    ],
    autoSync: false,
    syncInterval: 'daily'
  }
];

const ApiIntegrations: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [connections, setConnections] = useState<ApiConnection[]>(initialConnections);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [autoSync, setAutoSync] = useState<boolean>(true);
  const [syncInterval, setSyncInterval] = useState<string>('daily');
  const [customHeaders, setCustomHeaders] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Seçilen marka değiştiğinde dialog kontrolü
  useEffect(() => {
    // Eğer dialog açıksa ve seçilen marka değiştiyse, dialog içinde markanın seçili durumu güncellenir
    if (isAddDialogOpen) {
      // Dialog içindeki marka seçimi güncellenir
      setSelectedCategory('');
      setSelectedService('');
    }
  }, [selectedBrand, isAddDialogOpen]);
  
  // Brand seçildiğinde tab'ı yönet menüsüne geçir
  useEffect(() => {
    if (selectedBrand) {
      // Eğer AddDialog açık değilse ve zaten bir marka seçiliyse
      if (!isAddDialogOpen) {
        // Tab'ı "manage" olarak değiştir
        const tabElement = document.querySelector('[data-value="manage"]');
        if (tabElement) {
          (tabElement as HTMLElement).click();
        }
      }
    }
  }, [selectedBrand, isAddDialogOpen]);

  // Filter connections for the selected brand
  const brandConnections = connections.filter(conn => 
    (!selectedBrand || conn.brandId === selectedBrand) &&
    (conn.brandName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     conn.serviceName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter API services by selected category
  const filteredServices = apiServices.filter(service => 
    selectedCategory === 'all' || service.category === selectedCategory
  );
  
  const handleEndpointChange = (endpoint: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedEndpoints([...selectedEndpoints, endpoint]);
    } else {
      setSelectedEndpoints(selectedEndpoints.filter(e => e !== endpoint));
    }
  };
  
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
      try {
        const service = apiServices.find(s => s.id === selectedService);
        
        if (!service) {
          setConnectionStatus('error');
          setIsConnecting(false);
          toast({
            title: 'Hata',
            description: 'Seçilen API servisi bulunamadı.',
            variant: 'destructive',
          });
          return;
        }
        
        // Varsayılan endpoint'leri al veya seçilenleri kullan
        let endpoints: ApiEndpoint[] = [];
        if (selectedEndpoints.length > 0) {
          endpoints = selectedEndpoints.map(ep => ({
            id: `${service.id}_${ep}`,
            name: ep,
            enabled: true,
            custom_url: ''
          }));
        } else {
          endpoints = service.endpoints
            .filter(ep => ep.isDefault)
            .map(ep => ({
              id: `${service.id}_${ep.name}`,
              name: ep.name,
              enabled: true,
              custom_url: ''
            }));
        }
        
        const newConnection: ApiConnection = {
          id: Date.now().toString(),
          brandId: selectedBrand,
          brandName: brands.find(b => b.id === selectedBrand)?.name || '',
          serviceId: selectedService,
          serviceName: service.name,
          serviceIcon: service.icon,
          apiKey: apiKey,
          webhookUrl: webhookUrl,
          status: 'active',
          createdAt: new Date(),
          lastChecked: new Date(),
          endpoints: endpoints,
          autoSync: autoSync,
          syncInterval: syncInterval,
          customHeaders: customHeaders
        };
        
        setConnections([...connections, newConnection]);
        setApiKey('');
        setWebhookUrl('');
        setSelectedService('');
        setSelectedEndpoints([]);
        setCustomHeaders('');
        setIsConnecting(false);
        setConnectionStatus('success');
        setIsAddDialogOpen(false);
        
        toast({
          title: 'Bağlantı Başarılı',
          description: `${brands.find(b => b.id === selectedBrand)?.name} için ${service.name} API bağlantısı kuruldu.`,
        });
      } catch (error) {
        console.error("API bağlantısı oluşturulurken hata:", error);
        setConnectionStatus('error');
        setIsConnecting(false);
        toast({
          title: 'Beklenmeyen Hata',
          description: 'API bağlantısı oluşturulurken bir hata oluştu.',
          variant: 'destructive',
        });
      }
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
  
  const handleTestConnection = (connectionId: string) => {
    toast({
      title: 'Bağlantı Test Ediliyor',
      description: 'API bağlantısı test ediliyor, lütfen bekleyin...',
    });
    
    // Simulate testing
    setTimeout(() => {
      setConnections(
        connections.map(conn => 
          conn.id === connectionId 
            ? { ...conn, status: 'active', lastChecked: new Date() } 
            : conn
        )
      );
      
      toast({
        title: 'Test Başarılı',
        description: 'API bağlantısı başarıyla test edildi.',
      });
    }, 1500);
  };
  
  const handleCopyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: 'Kopyalandı',
      description: 'API anahtarı panoya kopyalandı.',
    });
  };

  // Reset form function update
  const resetForm = () => {
    setSelectedService('');
    setApiKey('');
    setWebhookUrl('');
    setConnectionStatus('idle');
    setSelectedEndpoints([]);
    setCustomHeaders('');
    setAutoSync(true);
    setSyncInterval('daily');
    setSelectedCategory('all');
  };

  const openAddDialog = (brandId?: string) => {
    resetForm();
    if (brandId) {
      setSelectedBrand(brandId);
    }
    
    // Dialog'u açmak için bir ufak gecikme ekleyelim
    setTimeout(() => {
      setIsAddDialogOpen(true);
    }, 10);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">API Entegrasyonları</h1>
      </div>

      {/* Marka Seçme Kartı - Ana Ekranda */}
      {!selectedBrand && (
        <Card className="bg-slate-50">
          <CardHeader>
            <CardTitle>Marka Seçin</CardTitle>
            <CardDescription>
              Markanızı seçerek mevcut API entegrasyonlarını görüntüleyin veya yeni ekleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {brands.map((brand) => {
                const brandApis = connections.filter(conn => conn.brandId === brand.id);
                return (
                  <Card 
                    key={brand.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedBrand(brand.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{brand.name}</CardTitle>
                      <CardDescription>
                        {brandApis.length} API bağlantısı
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {brandApis.slice(0, 3).map(api => (
                          <Badge key={api.id} variant="outline" className="text-xs">
                            <span className="mr-1">{api.serviceIcon}</span> {api.serviceName}
                          </Badge>
                        ))}
                        {brandApis.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{brandApis.length - 3} diğer
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 border-t">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        <span>Görüntüle</span>
                        <ChevronRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {selectedBrand && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedBrand('')}
              >
                Tüm Markalar
              </Button>
              <h2 className="text-xl font-medium">
                {brands.find(b => b.id === selectedBrand)?.name}
              </h2>
            </div>
            <Button onClick={() => openAddDialog(selectedBrand)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni API Ekle
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Bağlantıları</CardTitle>
              <CardDescription>
                Bu markaya ait mevcut API bağlantıları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="API adına göre ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              
              {brandConnections.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Bu marka için henüz API bağlantısı bulunmamaktadır.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => openAddDialog(selectedBrand)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni API Ekle
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {brandConnections.map((connection) => (
                    <Card key={connection.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                      <div className={`absolute top-0 left-0 w-2 h-full ${
                        connection.status === 'active' ? 'bg-green-500' :
                        connection.status === 'pending' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} />
                      
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{connection.serviceIcon}</span>
                            <div>
                              <CardTitle>{connection.serviceName}</CardTitle>
                              <CardDescription>
                                {connection.brandName}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge 
                            variant={connection.status === 'active' ? 'default' : 
                                  connection.status === 'pending' ? 'outline' : 'destructive'}
                          >
                            {connection.status === 'active' ? 'Aktif' : 
                             connection.status === 'pending' ? 'Beklemede' : 'Hata'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">API Anahtarı:</span>
                            <div className="flex items-center">
                              <span className="font-mono">•••••••••••••</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleCopyApiKey(connection.apiKey)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {connection.endpoints.map((endpoint) => (
                              <Badge 
                                key={endpoint.id} 
                                variant="outline"
                                className="bg-slate-50"
                              >
                                {endpoint.name}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                            <span>Oluşturulma: {connection.createdAt.toLocaleDateString()}</span>
                            {connection.lastChecked && (
                              <span>Son kontrol: {connection.lastChecked.toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTestConnection(connection.id)}
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Test Et
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            <Settings className="mr-1 h-3 w-3" />
                            Düzenle
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(connection.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Sil
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Yeni API Ekleme Dialog */}
      <Dialog 
        open={isAddDialogOpen} 
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Yeni API Bağlantısı Ekle</DialogTitle>
            <DialogDescription>
              {selectedBrand ? 
                `${brands.find(b => b.id === selectedBrand)?.name} için yeni API entegrasyonu oluşturun` :
                'Yeni API entegrasyonu oluşturmak için önce marka seçin'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            {!selectedBrand && (
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
            )}
            
            {selectedBrand && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-category">API Kategorisi</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setSelectedService('');
                    }}
                  >
                    <SelectTrigger id="api-category">
                      <SelectValue placeholder="API kategorisi seçin (opsiyonel)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Kategoriler</SelectItem>
                      {apiCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-service">API Servisi</Label>
                  <Select
                    value={selectedService}
                    onValueChange={(value) => {
                      setSelectedService(value);
                      setConnectionStatus('idle');
                      setSelectedEndpoints([]);
                    }}
                  >
                    <SelectTrigger id="api-service">
                      <SelectValue placeholder="API servisi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredServices.map((service) => (
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
              </>
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
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>API Endpointlerini Özelleştir</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Kullanmak istediğiniz API endpointlerini seçin (seçilmezse varsayılanlar kullanılır):
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {getServiceDetails(selectedService)?.endpoints.map((endpoint, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`endpoint-${endpoint.name}`}
                                checked={selectedEndpoints.includes(endpoint.name)}
                                onCheckedChange={(checked) => 
                                  handleEndpointChange(endpoint.name, checked === true)
                                }
                              />
                              <Label 
                                htmlFor={`endpoint-${endpoint.name}`}
                                className="flex items-center gap-2"
                              >
                                <span>{endpoint.name}</span>
                                {endpoint.isDefault && (
                                  <Badge variant="outline" className="text-xs bg-blue-50">
                                    Varsayılan
                                  </Badge>
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Gelişmiş Ayarlar</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="auto-sync"
                            checked={autoSync}
                            onCheckedChange={setAutoSync}
                          />
                          <Label htmlFor="auto-sync">Otomatik Senkronizasyon</Label>
                        </div>
                        
                        {autoSync && (
                          <div className="space-y-2">
                            <Label htmlFor="sync-interval">Senkronizasyon Aralığı</Label>
                            <Select
                              value={syncInterval}
                              onValueChange={setSyncInterval}
                            >
                              <SelectTrigger id="sync-interval">
                                <SelectValue placeholder="Senkronizasyon aralığı seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Saatlik</SelectItem>
                                <SelectItem value="daily">Günlük</SelectItem>
                                <SelectItem value="weekly">Haftalık</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="custom-headers">Özel HTTP Başlıkları (JSON formatında)</Label>
                          <Textarea
                            id="custom-headers"
                            placeholder='{"Authorization": "Bearer token", "X-Custom-Header": "Value"}'
                            value={customHeaders}
                            onChange={(e) => setCustomHeaders(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
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
                      API bağlantısı kurulurken bir hata oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting || !apiKey || !selectedBrand || !selectedService}
            >
              {isConnecting ? 'Bağlanıyor...' : 'API Bağlantısı Kur'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiIntegrations;
