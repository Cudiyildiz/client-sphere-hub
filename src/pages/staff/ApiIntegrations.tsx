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
  { id: 'marketing', name: 'Pazarlama' },
  { id: 'analytics', name: 'Analitik' }
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
    id: 'ikas', 
    name: 'İKAS', 
    description: 'E-ticaret altyapı platformu', 
    icon: '🛍️',
    category: 'e-commerce',
    endpoints: [
      { name: 'products', description: 'Ürün yönetimi', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: true },
      { name: 'categories', description: 'Kategori yönetimi', isDefault: false },
      { name: 'inventory', description: 'Stok yönetimi', isDefault: false }
    ],
    authType: 'apiKey'
  },
  { 
    id: 'trendyol', 
    name: 'Trendyol', 
    description: 'Türkiye e-ticaret pazaryeri', 
    icon: '🏪',
    category: 'e-commerce',
    endpoints: [
      { name: 'products', description: 'Ürün yönetimi', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'settlements', description: 'Ödeme ve uzlaşma', isDefault: false },
      { name: 'returns', description: 'İade yönetimi', isDefault: false },
      { name: 'questions', description: 'Ürün soruları', isDefault: false }
    ],
    authType: 'supplierAuth'
  },
  { 
    id: 'tcimax', 
    name: 'TCimax', 
    description: 'B2B e-ticaret yazılım çözümü', 
    icon: '🔄',
    category: 'e-commerce',
    endpoints: [
      { name: 'products', description: 'Ürün yönetimi', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: true },
      { name: 'pricing', description: 'Fiyatlandırma', isDefault: false },
      { name: 'stock', description: 'Stok yönetimi', isDefault: false },
      { name: 'invoices', description: 'Fatura yönetimi', isDefault: false }
    ],
    authType: 'tcimaxAuth'
  },
  { 
    id: 'hepsiburada', 
    name: 'Hepsiburada', 
    description: 'Türkiye online alışveriş platformu', 
    icon: '🛒',
    category: 'e-commerce',
    endpoints: [
      { name: 'listings', description: 'Ürün listeleme', isDefault: true },
      { name: 'orders', description: 'Sipariş yönetimi', isDefault: true },
      { name: 'inventory', description: 'Stok yönetimi', isDefault: true },
      { name: 'returns', description: 'İade yönetimi', isDefault: false },
      { name: 'claims', description: 'Şikayet yönetimi', isDefault: false }
    ],
    authType: 'apiKey'
  },
  { 
    id: 'google_ads', 
    name: 'Google Ads', 
    description: 'Google reklam platformu', 
    icon: '📈',
    category: 'marketing',
    endpoints: [
      { name: 'campaigns', description: 'Kampanya yönetimi', isDefault: true },
      { name: 'adgroups', description: 'Reklam grubu yönetimi', isDefault: true },
      { name: 'reports', description: 'Performans raporları', isDefault: true },
      { name: 'keywords', description: 'Anahtar kelime yönetimi', isDefault: false },
      { name: 'budget', description: 'Bütçe ayarları', isDefault: false }
    ],
    authType: 'oauth'
  },
  { 
    id: 'google_analytics', 
    name: 'Google Analytics', 
    description: 'Web analitik servisi', 
    icon: '📊',
    category: 'analytics',
    endpoints: [
      { name: 'reports', description: 'Rapor alma', isDefault: true },
      { name: 'events', description: 'Olay takibi', isDefault: true },
      { name: 'metrics', description: 'Metrik ölçümleri', isDefault: true },
      { name: 'dimensions', description: 'Boyut raporları', isDefault: false },
      { name: 'realtime', description: 'Gerçek zamanlı veriler', isDefault: false }
    ],
    authType: 'oauth'
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
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: true },
      { name: 'coupons', description: 'Kupon yönetimi', isDefault: false },
      { name: 'categories', description: 'Kategori yönetimi', isDefault: false }
    ],
    authType: 'consumerKey'
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
      { name: 'customers', description: 'Müşteri yönetimi', isDefault: true },
      { name: 'inventory', description: 'Stok yönetimi', isDefault: false },
      { name: 'fulfillments', description: 'Sipariş işleme', isDefault: false }
    ],
    authType: 'shopifyAuth'
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
  apiKey?: string;
  apiSecret?: string; 
  supplierId?: string;
  webhookUrl?: string;
  developerToken?: string;
  clientId?: string;
  clientSecret?: string;
  clientCustomerId?: string;
  refreshToken?: string;
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
  const [apiSecret, setApiSecret] = useState('');
  const [supplierId, setSupplierId] = useState('');
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
  
  // Google Ads için özel alanlar
  const [developerToken, setDeveloperToken] = useState('');
  const [clientCustomerId, setClientCustomerId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  
  // WooCommerce için özel alanlar
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  
  // Shopify için özel alanlar
  const [shopifyStore, setShopifyStore] = useState('');
  const [adminApiAccessToken, setAdminApiAccessToken] = useState('');
  
  // Google Analytics için özel alanlar
  const [gaViewId, setGaViewId] = useState('');
  
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
    if (!selectedBrand || !selectedService) return;
    
    const selectedServiceData = apiServices.find(s => s.id === selectedService);
    if (!selectedServiceData) return;
    
    // Her servis için farklı bağlantı mantığı
    let apiData: any = {
      id: `conn-${Date.now()}`,
      brandId: selectedBrand,
      brandName: brands.find(b => b.id === selectedBrand)?.name || '',
      serviceId: selectedService,
      serviceName: selectedServiceData.name,
      serviceIcon: selectedServiceData.icon,
      status: 'active',
      createdAt: new Date(),
      lastChecked: new Date(),
      autoSync,
      syncInterval,
      endpoints: selectedEndpoints.map(name => ({
        id: `endpoint-${Date.now()}-${name}`,
        name,
        enabled: true
      }))
    };
    
    // API'ye göre farklı kimlik doğrulama bilgileri
    switch (selectedServiceData.authType) {
      case 'oauth':
        // Google Ads için
        if (selectedService === 'google_ads') {
          if (!developerToken || !clientId || !clientSecret || !clientCustomerId) {
      toast({
              title: "Eksik Bilgi",
              description: "Google Ads bağlantısı için tüm gerekli alanları doldurmalısınız.",
              variant: "destructive"
      });
      return;
    }
    
          apiData = {
            ...apiData,
            developerToken,
            clientId,
            clientSecret,
            clientCustomerId,
            refreshToken,
            apiKey: `gads-${Date.now()}` // Sistem içi referans için
          };
          
          // Google Ads için dokümantasyona yönlendirme
          toast({
            title: "Google Ads Bağlantısı",
            description: "OAuth yetkilendirme işlemi için yönlendirileceksiniz.",
          });
          
          // OAuth yönlendirme simülasyonu
    setTimeout(() => {
            window.open('https://developers.google.com/google-ads/api/docs/oauth/overview', '_blank');
          }, 1000);
        }
        // Google Analytics için
        else if (selectedService === 'google_analytics') {
          if (!clientId || !clientSecret || !gaViewId) {
            toast({
              title: "Eksik Bilgi",
              description: "Google Analytics bağlantısı için Client ID, Client Secret ve View ID alanları gereklidir.",
              variant: "destructive"
            });
            return;
          }
          
          apiData = {
            ...apiData,
            clientId,
            clientSecret,
            refreshToken,
            gaViewId,
            apiKey: `ga-${Date.now()}` // Sistem içi referans için
          };
          
          toast({
            title: "Google Analytics Bağlantısı",
            description: "OAuth yetkilendirme işlemi için yönlendirileceksiniz.",
          });
          
          // OAuth yönlendirme simülasyonu
          setTimeout(() => {
            window.open('https://developers.google.com/analytics/devguides/reporting/core/v4/authorization', '_blank');
          }, 1000);
        }
        break;
        
      case 'tcimaxAuth':
        // TCimax için
        if (!apiKey || !apiSecret || !supplierId) {
      toast({
            title: "Eksik Bilgi",
            description: "TCimax API bağlantısı için API Key, API Secret ve Şirket ID alanları gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        apiData = {
          ...apiData,
          apiKey,
          apiSecret,
          supplierId,
          webhookUrl: webhookUrl || undefined,
          customHeaders: customHeaders || undefined
        };
        
        toast({
          title: "TCimax Bağlantısı",
          description: "TCimax API bağlantısı oluşturuluyor...",
        });
        break;
        
      case 'supplierAuth':
        // Trendyol için
        if (!supplierId || !apiKey || !apiSecret) {
          toast({
            title: "Eksik Bilgi",
            description: "Trendyol API bağlantısı için tedarikçi ID, API Key ve API Secret gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        apiData = {
          ...apiData,
          supplierId,
          apiKey,
          apiSecret
        };
        break;
        
      case 'apiKey':
        // İKAS veya Hepsiburada
        if (!apiKey) {
          toast({
            title: "Eksik Bilgi",
            description: "API anahtarı gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        if (selectedService === 'ikas' && !apiSecret) {
          toast({
            title: "Eksik Bilgi",
            description: "İKAS API bağlantısı için API Secret gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        if (selectedService === 'hepsiburada' && !supplierId) {
          toast({
            title: "Eksik Bilgi",
            description: "Hepsiburada API bağlantısı için Satıcı ID gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        apiData = {
          ...apiData,
          apiKey,
          apiSecret: selectedService === 'ikas' ? apiSecret : undefined,
          supplierId: selectedService === 'hepsiburada' ? supplierId : undefined,
          webhookUrl: webhookUrl || undefined,
          customHeaders: customHeaders || undefined
        };
        break;

      case 'consumerKey':
        // WooCommerce için
        if (!consumerKey || !consumerSecret || !siteUrl) {
          toast({
            title: "Eksik Bilgi",
            description: "WooCommerce API bağlantısı için Site URL, Consumer Key ve Consumer Secret gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        // Site URL'nin biçimini kontrol et
        if (!siteUrl.startsWith('http')) {
          toast({
            title: "Hatalı URL",
            description: "Site URL 'http://' veya 'https://' ile başlamalıdır.",
            variant: "destructive"
          });
          return;
        }
        
        apiData = {
          ...apiData,
          siteUrl,
          consumerKey,
          consumerSecret,
          webhookUrl: webhookUrl || undefined,
          apiKey: consumerKey // Referans için
        };
        break;
        
      case 'shopifyAuth':
        // Shopify için
        if (!shopifyStore || !adminApiAccessToken || !apiKey || !apiSecret) {
          toast({
            title: "Eksik Bilgi",
            description: "Shopify API bağlantısı için Mağaza Adı, Admin API Erişim Tokeni, API Key ve API Secret gereklidir.",
            variant: "destructive"
          });
          return;
        }
        
        // Shopify mağaza adını formatlama
        const formattedShopifyStore = shopifyStore
          .replace(/\s+/g, '-')         // Boşlukları tire ile değiştir
          .replace(/[^\w-]+/g, '')      // Alfanümerik olmayan karakterleri kaldır
          .toLowerCase();               // Küçük harfe dönüştür
          
        if (!formattedShopifyStore) {
          toast({
            title: "Geçersiz Mağaza Adı",
            description: "Lütfen geçerli bir Shopify mağaza adı girin.",
            variant: "destructive"
          });
          return;
        }
        
        apiData = {
          ...apiData,
          shopifyStore: formattedShopifyStore,
          shopUrl: `https://${formattedShopifyStore}.myshopify.com`,
          adminApiAccessToken,
          apiKey,
          apiSecret,
          webhookUrl: webhookUrl || undefined
        };
        break;
      
      default:
        toast({
          title: "Hata",
          description: "Geçersiz API türü.",
          variant: "destructive"
        });
        return;
    }
    
    // Bağlantı kaydı
    setConnections(prev => [...prev, apiData]);
    
    // Başarılı bildirim
    toast({
      title: "Bağlantı Başarılı",
      description: `${apiData.serviceName} bağlantısı başarıyla kuruldu.`,
    });
    
    // Formu sıfırla ve dialogu kapat
    resetForm();
    setIsAddDialogOpen(false);
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
    setSelectedBrand('');
            setSelectedService('');
            setApiKey('');
    setApiSecret('');
    setSupplierId('');
            setWebhookUrl('');
    setAutoSync(true);
    setSyncInterval('daily');
    setSelectedEndpoints([]);
    setCustomHeaders('');
    // Google Ads için özel alanları sıfırla
    setDeveloperToken('');
    setClientCustomerId('');
    setRefreshToken('');
    setClientId('');
    setClientSecret('');
    // WooCommerce için özel alanları sıfırla
    setConsumerKey('');
    setConsumerSecret('');
    setSiteUrl('');
    // Shopify için özel alanları sıfırla
    setShopifyStore('');
    setAdminApiAccessToken('');
    // Google Analytics için özel alanları sıfırla
    setGaViewId('');
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
  
  // Render service specific fields based on authType
  const renderServiceSpecificFields = () => {
    const selectedServiceData = apiServices.find(s => s.id === selectedService);
    if (!selectedServiceData) return null;
    
    switch (selectedServiceData.authType) {
      case 'oauth':
        // Google servisleri için OAuth (Ads ve Analytics)
        if (selectedService === 'google_ads') {
          return (
            <div className="space-y-4 border rounded-md p-4 bg-slate-50">
              <h3 className="font-medium text-sm">Google Ads API Yapılandırması</h3>
              
              <div className="space-y-2">
                <Label htmlFor="developerToken">Geliştirici Token</Label>
                <Input
                  id="developerToken"
                  value={developerToken}
                  onChange={(e) => setDeveloperToken(e.target.value)}
                  placeholder="Örn: _AbCdEfGhIjKlMnOpQrStUv"
                />
                <p className="text-xs text-muted-foreground">
                  Google Ads API'ye erişim için geliştirici tokenınız
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientCustomerId">Müşteri ID</Label>
                <Input
                  id="clientCustomerId"
                  value={clientCustomerId}
                  onChange={(e) => setClientCustomerId(e.target.value)}
                  placeholder="Örn: 123-456-7890"
                />
                <p className="text-xs text-muted-foreground">
                  Google Ads hesabınızın müşteri ID'si
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientId">OAuth Client ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Örn: 123456789-abcdefg.apps.googleusercontent.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Örn: ABCDEF-1234567890"
                  type="password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refreshToken">Refresh Token</Label>
                <Input
                  id="refreshToken"
                  value={refreshToken}
                  onChange={(e) => setRefreshToken(e.target.value)}
                  placeholder="Refresh token"
                  type="password"
                />
                <p className="text-xs text-muted-foreground">
                  OAuth 2.0 yetkilendirmesi için refresh token
                </p>
              </div>
              
              <div className="mt-4">
                <Button 
          variant="outline"
                  size="sm" 
                  className="text-xs"
                  onClick={() => window.open('https://developers.google.com/google-ads/api/docs/oauth/overview', '_blank')}
        >
                  OAuth 2.0 Dokümantasyonu
        </Button>
      </div>
            </div>
          );
        } else if (selectedService === 'google_analytics') {
          return (
            <div className="space-y-4 border rounded-md p-4 bg-slate-50">
              <h3 className="font-medium text-sm">Google Analytics API Yapılandırması</h3>
              
              <div className="space-y-2">
                <Label htmlFor="gaViewId">Görünüm ID (View ID)</Label>
                <Input
                  id="gaViewId"
                  value={gaViewId}
                  onChange={(e) => setGaViewId(e.target.value)}
                  placeholder="Örn: ga:123456789"
                />
                <p className="text-xs text-muted-foreground">
                  Google Analytics görünüm ID'niz. GA4'te bu Measurement ID olarak geçer.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientId">OAuth Client ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Örn: 123456789-abcdefg.apps.googleusercontent.com"
                />
              </div>
              
                <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Örn: ABCDEF-1234567890"
                  type="password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refreshToken">Refresh Token</Label>
                <Input
                  id="refreshToken"
                  value={refreshToken}
                  onChange={(e) => setRefreshToken(e.target.value)}
                  placeholder="Refresh token"
                  type="password"
                />
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => window.open('https://developers.google.com/analytics/devguides/reporting/core/v4', '_blank')}
                >
                  Google Analytics API Dokümantasyonu
                </Button>
                          </div>
                </div>
          );
        }
        break;
              
      case 'tcimaxAuth':
        // TCimax için kimlik doğrulama alanları
        return (
                <div className="space-y-4 border rounded-md p-4 bg-slate-50">
            <h3 className="font-medium text-sm">TCimax API Yapılandırması</h3>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Anahtarı</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="API anahtarınızı girin"
              />
              <p className="text-xs text-muted-foreground">
                TCimax yönetim panelinden alacağınız API anahtarı
                      </p>
                    </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Gizli Anahtarı</Label>
              <Input
                id="apiSecret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="API gizli anahtarınızı girin"
                type="password"
              />
                  </div>
                  
                  <div className="space-y-2">
              <Label htmlFor="supplierId">Şirket ID</Label>
                    <Input
                id="supplierId"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                placeholder="TCimax Şirket/Hesap ID'nizi girin"
              />
              <p className="text-xs text-muted-foreground">
                TCimax'teki şirket/hesap kimlik numaranız
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL (isteğe bağlı)</Label>
              <Input
                id="webhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Örn: https://example.com/webhook"
              />
              <p className="text-xs text-muted-foreground">
                Sipariş, stok değişikliği gibi olaylarda TCimax'in bildirim göndereceği adres
              </p>
            </div>
            
            <div className="mt-2">
              <Alert variant="outline" className="bg-orange-50 border-orange-200 text-orange-800 text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">Bilgi</AlertTitle>
                <AlertDescription className="text-xs">
                  TCimax API bilgilerinizi TCimax Yönetim Paneli'ndeki API Entegrasyonları bölümünden edinebilirsiniz. API kullanımı için genellikle yetkili TCimax destek ekibiyle iletişime geçmeniz gerekebilir.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );
      
      case 'supplierAuth':
        // Trendyol için tedarikçi kimlik doğrulama
        return (
          <div className="space-y-4 border rounded-md p-4 bg-slate-50">
            <h3 className="font-medium text-sm">Trendyol API Yapılandırması</h3>
            
            <div className="space-y-2">
              <Label htmlFor="supplierId">Tedarikçi ID</Label>
              <Input
                id="supplierId"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                placeholder="Tedarikçi ID'nizi girin"
              />
              <p className="text-xs text-muted-foreground">
                Trendyol satıcı panelinizden alacağınız tedarikçi ID
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Anahtarı (API Key)</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="API anahtarınızı girin"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Gizli Anahtarı (API Secret)</Label>
              <Input
                id="apiSecret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="API gizli anahtarınızı girin"
                      type="password"
              />
            </div>
            
            <div className="mt-2">
              <Alert variant="outline" className="bg-amber-50 border-amber-200 text-amber-800 text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">Bilgi</AlertTitle>
                <AlertDescription className="text-xs">
                  Trendyol API kimlik bilgilerini Trendyol Satıcı Paneli'ndeki <strong>Hesabım &gt; API Entegrasyonu</strong> bölümünden alabilirsiniz.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );
      
      case 'apiKey':
        // Hepsiburada ve İKAS için API key yöntemi
        const isHepsiburada = selectedService === 'hepsiburada';
        
        return (
          <div className="space-y-4 border rounded-md p-4 bg-slate-50">
            <h3 className="font-medium text-sm">{isHepsiburada ? 'Hepsiburada' : 'İKAS'} API Yapılandırması</h3>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Anahtarı</Label>
              <Input
                id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                placeholder="API anahtarınızı girin"
                    />
                  </div>
                  
            {isHepsiburada && (
                    <div className="space-y-2">
                <Label htmlFor="merchantId">Satıcı ID</Label>
                      <Input
                  id="merchantId"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  placeholder="Hepsiburada satıcı ID'nizi girin"
                />
              </div>
            )}
            
            {!isHepsiburada && (
              <div className="space-y-2">
                <Label htmlFor="apiSecret">API Gizli Anahtarı</Label>
                <Input
                  id="apiSecret"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  placeholder="API gizli anahtarınızı girin"
                  type="password"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL (isteğe bağlı)</Label>
              <Input
                id="webhookUrl"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Örn: https://example.com/webhook"
                      />
                    </div>
            
            <div className="mt-2">
              <Alert variant="outline" className="bg-blue-50 border-blue-200 text-blue-800 text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">Bilgi</AlertTitle>
                <AlertDescription className="text-xs">
                  {isHepsiburada 
                    ? "API bilgilerinizi Hepsiburada Satıcı Paneli'ndeki API Erişim Bilgileri bölümünden alabilirsiniz."
                    : "İKAS API kimlik bilgilerinizi İKAS Yönetim Paneli'ndeki Entegrasyonlar bölümünden alabilirsiniz."}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );
        
      case 'consumerKey':
        // WooCommerce için Consumer Key kimlik doğrulama
        return (
          <div className="space-y-4 border rounded-md p-4 bg-slate-50">
            <h3 className="font-medium text-sm">WooCommerce API Yapılandırması</h3>
            
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="Örn: https://websitem.com"
              />
              <p className="text-xs text-muted-foreground">
                WooCommerce kurulu olan WordPress sitenizin tam URL'si
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="consumerKey">Consumer Key</Label>
              <Input
                id="consumerKey"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                placeholder="Consumer Key girin"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="consumerSecret">Consumer Secret</Label>
              <Input
                id="consumerSecret"
                value={consumerSecret}
                onChange={(e) => setConsumerSecret(e.target.value)}
                placeholder="Consumer Secret girin"
                type="password"
              />
            </div>
            
            <div className="mt-2">
              <Alert variant="outline" className="bg-green-50 border-green-200 text-green-800 text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">Bilgi</AlertTitle>
                <AlertDescription className="text-xs">
                  WooCommerce API anahtarlarını WordPress yönetim panelinizden <strong>WooCommerce &gt; Ayarlar &gt; Gelişmiş &gt; REST API</strong> bölümünden oluşturabilirsiniz. "Okuma/Yazma" yetkisi vermeyi unutmayın.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );
        
      case 'shopifyAuth':
        // Shopify için Admin API
        return (
          <div className="space-y-4 border rounded-md p-4 bg-slate-50">
            <h3 className="font-medium text-sm">Shopify API Yapılandırması</h3>
            
            <div className="space-y-2">
              <Label htmlFor="shopifyStore">Mağaza Adı</Label>
              <div className="flex">
                <Input
                  id="shopifyStore"
                  value={shopifyStore}
                  onChange={(e) => setShopifyStore(e.target.value)}
                  placeholder="magazam"
                />
                <span className="border border-l-0 rounded-r-md px-3 flex items-center bg-slate-100 text-sm">
                  .myshopify.com
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shopify mağazanızın adı (myshopify.com uzantısı olmadan)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminApiAccessToken">Admin API Erişim Tokeni</Label>
              <Input
                id="adminApiAccessToken"
                value={adminApiAccessToken}
                onChange={(e) => setAdminApiAccessToken(e.target.value)}
                placeholder="shpat_..."
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                Shopify Admin API ile iletişim kurmak için gereken erişim tokeni
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Anahtarı</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="API Key"
              />
              <p className="text-xs text-muted-foreground">
                Shopify API Key (App API Key olarak da bilinir)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Gizli Anahtarı</Label>
              <Input
                id="apiSecret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="API Secret Key"
                type="password"
              />
            </div>
            
            <div className="mt-2">
              <Alert variant="outline" className="bg-purple-50 border-purple-200 text-purple-800 text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">Bilgi</AlertTitle>
                <AlertDescription className="text-xs">
                  Bu bilgileri Shopify yönetim panelinizden <strong>Uygulamalar &gt; Uygulama Geliştirme &gt; Özel Uygulama Oluştur</strong> bölümünden oluşturabilirsiniz. Admin API erişim tokenini oluştururken gerekli izinleri vermeyi unutmayın.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">API Entegrasyonları</h1>
        <Button onClick={() => openAddDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni Entegrasyon
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tüm Servisler</TabsTrigger>
          {apiCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-6">
          {/* Marka filtreleme ve arama */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <Label htmlFor="brandFilter">Marka Filtresi</Label>
              <Select 
                value={selectedBrand} 
                onValueChange={setSelectedBrand}
              >
                <SelectTrigger id="brandFilter">
                  <SelectValue placeholder="Tüm Markalar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Markalar</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-2/3">
              <Label htmlFor="searchFilter">API Servisi Ara</Label>
              <Input
                id="searchFilter"
                placeholder="Servis adına göre ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Google Ads API'si için özel açıklama kartı */}
          {selectedService === 'google_ads' && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Google Ads API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Google Ads API entegrasyonu için aşağıdaki adımları izlemeniz gerekmektedir:
                </p>
                <ol className="list-decimal pl-5 space-y-1 mb-2">
                  <li className="text-sm">Google Cloud Console'da bir proje oluşturun</li>
                  <li className="text-sm">OAuth 2.0 kimlik bilgilerini yapılandırın</li>
                  <li className="text-sm">Google Ads API'sine erişim izni alın</li>
                  <li className="text-sm">Geliştirici (Developer) token'ı alın</li>
                  <li className="text-sm">Müşteri ID'sini bulun</li>
                </ol>
                <p className="mb-2">
                  <strong>Not:</strong> Google Ads API entegrasyonu her marka için ayrı yapılandırma gerektirir.
                  Entegrasyon yaptığınız markanın Google hesabına yönetici erişiminiz olduğundan emin olun.
                </p>
                <p>
                  Daha fazla bilgi için <a href="https://developers.google.com/google-ads/api/docs/start" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads API Dökümanları</a>'nı inceleyebilirsiniz.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Trendyol API'si için özel açıklama kartı */}
          {selectedService === 'trendyol' && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Trendyol API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Trendyol API ile entegrasyon için aşağıdaki bilgilere ihtiyacınız olacak:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">Tedarikçi ID (Supplier ID)</li>
                  <li className="text-sm">API Key</li>
                  <li className="text-sm">API Secret</li>
                </ul>
                <p className="mb-2">
                  Bu bilgileri <strong>Trendyol Satıcı Paneli &gt; Hesabım &gt; API Entegrasyonu</strong> menüsünden alabilirsiniz.
                </p>
                <p>
                  Daha fazla bilgi için <a href="https://developers.trendyol.com/tr" target="_blank" rel="noopener noreferrer" className="text-primary underline">Trendyol API Dökümanları</a>'nı inceleyebilirsiniz.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Hepsiburada API'si için özel açıklama kartı */}
          {selectedService === 'hepsiburada' && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle>Hepsiburada API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Hepsiburada API entegrasyonu için gerekli bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">API Key (Satıcı panelinden alınacak)</li>
                  <li className="text-sm">Satıcı ID (Merchant ID)</li>
                </ul>
                <p className="mb-2">
                  Bu bilgileri <strong>Hepsiburada Satıcı Paneli &gt; Hesap Ayarları &gt; API Erişim Bilgileri</strong> bölümünden edinebilirsiniz.
                </p>
                <p>
                  Daha fazla bilgi için <a href="https://developers.hepsiburada.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Hepsiburada API Dökümanları</a>'nı inceleyebilirsiniz.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* İKAS API'si için özel açıklama kartı */}
          {selectedService === 'ikas' && (
                    <Alert className="bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>İKAS API Entegrasyonu</AlertTitle>
                      <AlertDescription>
                <p className="mb-2">
                  İKAS API entegrasyonu için gerekli bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">API Key</li>
                  <li className="text-sm">API Secret</li>
                </ul>
                <p className="mb-2">
                  Bu bilgileri <strong>İKAS Yönetim Paneli &gt; Ayarlar &gt; Entegrasyonlar</strong> bölümünden alabilirsiniz.
                </p>
                <p>
                  Webhook URL, İKAS'tan gelecek bildirimler (sipariş, ürün güncelleme vb.) için kullanılacaktır.
                </p>
                      </AlertDescription>
                    </Alert>
                  )}
                  
          {/* Google Analytics API'si için özel açıklama kartı */}
          {selectedService === 'google_analytics' && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle>Google Analytics API Entegrasyonu</AlertTitle>
                      <AlertDescription>
                <p className="mb-2">
                  Google Analytics API entegrasyonu için gerekli adımlar:
                </p>
                <ol className="list-decimal pl-5 space-y-1 mb-2">
                  <li className="text-sm">Google Cloud Console'da bir proje oluşturun</li>
                  <li className="text-sm">Analytics Reporting API'yi etkinleştirin</li>
                  <li className="text-sm">OAuth 2.0 kimlik bilgilerini yapılandırın</li>
                  <li className="text-sm">Gerekli API izinlerini tanımlayın</li>
                  <li className="text-sm">Görünüm ID'nizi Google Analytics hesabınızdan alın</li>
                </ol>
                <p className="mb-2">
                  <strong>Görünüm ID (View ID):</strong> GA Yönetici panelinden Görünüm Ayarları bölümünden elde edilebilir. GA4 ile entegrasyon için ölçüm ID veya akış ID'si gereklidir.
                </p>
                <p>
                  Daha fazla bilgi için <a href="https://developers.google.com/analytics/devguides/reporting/core/v4" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Analytics API Dökümanları</a>'nı inceleyebilirsiniz.
                </p>
                      </AlertDescription>
                    </Alert>
                  )}
                  
          {/* WooCommerce API'si için özel açıklama kartı */}
          {selectedService === 'woocommerce' && (
            <Alert className="bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>WooCommerce API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  WooCommerce REST API entegrasyonu için gerekli bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">Site URL (WordPress sitenizin tam adresi)</li>
                  <li className="text-sm">Consumer Key ve Consumer Secret (API anahtarları)</li>
                </ul>
                <p className="mb-2">
                  API anahtarlarınızı WordPress admin panelinizden <strong>WooCommerce &gt; Ayarlar &gt; Gelişmiş &gt; REST API</strong> bölümünden oluşturabilirsiniz. "Okuma/Yazma" yetkisi vermeyi unutmayın.
                </p>
                <p>
                  Webhook URL, siparişlerde değişiklik olduğunda otomatik bildirim almak için kullanılabilir. Bu isteğe bağlıdır.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* TCimax API'si için özel açıklama kartı */}
          {selectedService === 'tcimax' && (
            <Alert className="bg-orange-50 border-orange-200">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertTitle>TCimax API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  TCimax API entegrasyonu için gerekli bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">API Key (API Anahtarı)</li>
                  <li className="text-sm">API Secret (API Gizli Anahtarı)</li>
                  <li className="text-sm">Şirket/Hesap ID</li>
                </ul>
                <p className="mb-2">
                  Bu bilgileri <strong>TCimax Yönetim Paneli &gt; Ayarlar &gt; API Entegrasyonları</strong> bölümünden alabilirsiniz.
                  API kullanımı için genellikle TCimax destek ekibiyle iletişime geçmeniz ve gerekli izinlerin tanımlanması gerekebilir.
                </p>
                <p>
                  TCimax API'si, B2B işlemlerinizi, stok yönetiminizi, siparişlerinizi ve fiyatlandırma stratejilerinizi 
                  diğer sistemlerle entegre etmenizi sağlar.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Shopify API'si için özel açıklama kartı */}
          {selectedService === 'shopify' && (
            <Alert className="bg-purple-50 border-purple-200">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertTitle>Shopify API Entegrasyonu</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Shopify Admin API entegrasyonu için gerekli bilgiler:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li className="text-sm">Mağaza Adı (örn: magazam.myshopify.com adresindeki "magazam" kısmı)</li>
                  <li className="text-sm">Admin API Erişim Tokeni (Private App veya Custom App üzerinden alınır)</li>
                  <li className="text-sm">API Key ve API Secret Key</li>
                </ul>
                <p className="mb-2">
                  Bu bilgileri <strong>Shopify Admin &gt; Apps &gt; App and Sales Channel Settings &gt; Develop Apps</strong> bölümünden özel uygulama oluşturarak alabilirsiniz.
                </p>
                <p>
                  API erişim tokenini oluştururken, ihtiyacınız olan API izinlerini seçmeyi unutmayın (örn: products, orders, customers).
                </p>
                <p className="mt-2">
                  Daha fazla bilgi için <a href="https://shopify.dev/api/admin-rest" target="_blank" rel="noopener noreferrer" className="text-primary underline">Shopify Admin API Dökümanları</a>'nı inceleyebilirsiniz.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* API Bağlantı listesi */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brandConnections.map(connection => (
              <Card key={connection.id} className="overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 rounded-md bg-primary/10 text-2xl">
                    {connection.serviceIcon}
                  </div>
                  <div>
                    <CardTitle>{connection.serviceName}</CardTitle>
                    <CardDescription>
                      {connection.brandName}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Durum:</span>
                      <Badge variant={connection.status === 'active' ? 'default' : connection.status === 'pending' ? 'outline' : 'destructive'}>
                        {connection.status === 'active' ? 'Aktif' : connection.status === 'pending' ? 'Beklemede' : 'Hata'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">API Anahtarı:</span>
                      <div className="flex items-center">
                        <span className="font-mono text-xs">•••••••••••••</span>
                  <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleCopyApiKey(connection.apiKey || '')}
                        >
                          <Copy className="h-3 w-3" />
                  </Button>
                </div>
                    </div>
                    
                    {connection.serviceId === 'google_ads' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Müşteri ID:</span>
                        <span className="text-xs font-mono">{connection.brandId}-ads</span>
                </div>
              )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Senkronizasyon:</span>
                      <Badge variant="outline" className={connection.autoSync ? "bg-green-50" : "bg-slate-50"}>
                        {connection.autoSync ? `${connection.syncInterval} Otomatik` : "Manuel"}
                      </Badge>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">Etkin uç noktalar:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {connection.endpoints.map((endpoint) => (
                          <Badge 
                            key={endpoint.id} 
                            variant="outline"
                            className={endpoint.enabled ? "bg-primary/10" : "bg-slate-50 text-muted-foreground"}
                          >
                            {endpoint.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
            </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTestConnection(connection.id)}
                  >
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Test Et
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Düzenle
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(connection.id)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Sil
                    </Button>
                  </div>
                </CardFooter>
          </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Yeni API Ekleme Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <DialogTitle className="text-2xl">Yeni API Entegrasyonu</DialogTitle>
            <DialogDescription>
              Markanız için yeni bir API entegrasyonu ekleyin
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <span className="bg-primary/10 p-1 rounded-md mr-2">🏢</span>
                  Bağlantı Bilgileri
                </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="brandSelect">Marka Seçin</Label>
                  <Select
                    value={selectedBrand}
                    onValueChange={setSelectedBrand}
                  >
                      <SelectTrigger id="brandSelect" className="h-10">
                      <SelectValue placeholder="Marka seçin" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map(brand => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="serviceSelect">API Servisi</Label>
                    <Select 
                      value={selectedService} 
                      onValueChange={(value) => {
                        setSelectedService(value);
                        
                        // Servis değiştiğinde varsayılan endpoint'leri seç
                        const service = apiServices.find(s => s.id === value);
                        if (service) {
                          const defaultEndpoints = service.endpoints
                            .filter(e => e.isDefault)
                            .map(e => e.name);
                          setSelectedEndpoints(defaultEndpoints);
                        } else {
                          setSelectedEndpoints([]);
                        }
                      }}
                    >
                      <SelectTrigger id="serviceSelect" className="h-10">
                        <SelectValue placeholder="API servisi seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {apiServices.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center">
                              <span className="mr-2">{service.icon}</span>
                              {service.name}
                                  </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                                </div>
                                  </div>
                
                {selectedService && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">⚙️</span>
                      Senkronizasyon Ayarları
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                      <Label htmlFor="auto-sync" className="font-medium">Otomatik Senkronizasyon</Label>
                      <Switch
                        id="auto-sync"
                        checked={autoSync}
                        onCheckedChange={setAutoSync}
                      />
                                  </div>
                                  
                    {autoSync && (
                      <div className="space-y-2">
                        <Label htmlFor="syncInterval">Senkronizasyon Aralığı</Label>
                        <Select 
                          value={syncInterval} 
                          onValueChange={setSyncInterval}
                        >
                          <SelectTrigger id="syncInterval" className="h-10">
                            <SelectValue placeholder="Senkronizasyon sıklığı" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Saatlik</SelectItem>
                            <SelectItem value="daily">Günlük</SelectItem>
                            <SelectItem value="weekly">Haftalık</SelectItem>
                            <SelectItem value="monthly">Aylık</SelectItem>
                          </SelectContent>
                        </Select>
                                  </div>
                    )}
                                </div>
                )}
                      </div>
              
              <div>
                {/* API servisine özel alanlar */}
                {renderServiceSpecificFields()}
                
                {selectedService && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">🔌</span>
                      Aktif Edilecek Uç Noktalar
                    </h3>
                    <div className="grid grid-cols-1 gap-3 p-3 bg-slate-50 rounded-md">
                      {apiServices.find(s => s.id === selectedService)?.endpoints.map(endpoint => (
                        <div key={endpoint.name} className="flex items-start space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                          <Checkbox 
                            id={`endpoint-${endpoint.name}`}
                            checked={selectedEndpoints.includes(endpoint.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedEndpoints([...selectedEndpoints, endpoint.name]);
                              } else {
                                setSelectedEndpoints(selectedEndpoints.filter(e => e !== endpoint.name));
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="grid gap-1 leading-none">
                            <Label
                              htmlFor={`endpoint-${endpoint.name}`}
                              className="text-sm font-medium leading-none"
                            >
                              {endpoint.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {endpoint.description}
                            </p>
                    </div>
                    </div>
                      ))}
                    </div>
                    
                    <Accordion type="single" collapsible>
                      <AccordionItem value="advanced">
                        <AccordionTrigger>Gelişmiş Ayarlar</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <Label htmlFor="customHeaders">Özel HTTP Başlıkları</Label>
                            <Textarea
                              id="customHeaders"
                              value={customHeaders}
                              onChange={(e) => setCustomHeaders(e.target.value)}
                              placeholder='{"X-Custom-Header": "value"}'
                              className="min-h-[100px] font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                              JSON formatında özel HTTP başlıkları
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-6 border-t bg-slate-50 sticky bottom-0">
            <Button variant="outline" onClick={resetForm}>
              İptal
            </Button>
            <Button 
              onClick={handleConnect} 
              disabled={!selectedBrand || !selectedService}
              className="min-w-[100px]"
            >
              Bağlantı Kur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiIntegrations;
