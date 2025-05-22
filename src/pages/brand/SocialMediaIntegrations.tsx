import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight,
  Instagram,
  Facebook,
  MessageSquare,
  Users,
  Search,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Sosyal medya ve mesajlaşma platformları
const socialPlatforms = [
  { 
    id: 'facebook',
    name: 'Facebook',
    description: 'Sayfa ve reklam performansı verilerinize erişin',
    icon: <Facebook className="h-6 w-6" />,
    color: 'bg-blue-600',
    permissions: [
      'Reklam hesaplarına erişim',
      'Sayfa içeriklerine erişim',
      'Reklam istatistiklerine erişim',
      'Mesajlara erişim ve yanıtlama'
    ],
    businessType: true,
    features: ['ads', 'messages', 'analytics'],
    integrationPath: 'meta'
  },
  { 
    id: 'instagram',
    name: 'Instagram',
    description: 'Instagram işletme profilinizin analizlerine erişin',
    icon: <Instagram className="h-6 w-6" />,
    color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    permissions: [
      'İçerik metriklerine erişim',
      'Takipçi verilerine erişim',
      'Etkileşim analizine erişim',
      "DM'lere erişim ve yanıtlama"
    ],
    businessType: true,
    features: ['ads', 'messages', 'analytics'],
    integrationPath: 'meta'
  },
  { 
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Müşterilerinizle WhatsApp üzerinden iletişim kurun',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'bg-green-600',
    permissions: [
      'Mesajlara erişim ve gönderim',
      'Şablon mesaj kullanımı',
      'Katalog yönetimi',
      'Otomatik yanıtlar'
    ],
    businessType: true,
    features: ['messages', 'templates'],
    integrationPath: 'meta'
  }
];

// Bağlantı durumu
interface Connection {
  platformId: string;
  status: 'connected' | 'disconnected' | 'expired';
  connectedAt?: Date;
  expiresAt?: Date;
  accountName?: string;
  permissions?: string[];
  metaBusinessId?: string;
  features?: string[];
}

// Tab tanımları
const tabs = [
  { id: 'all', label: 'Tüm Platformlar' },
  { id: 'ads', label: 'Reklam Platformları' },
  { id: 'messages', label: 'Mesajlaşma' }
];

const SocialMediaIntegrations: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { 
      platformId: 'facebook', 
      status: 'connected', 
      accountName: 'Marka Sayfası', 
      connectedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      metaBusinessId: '123456789012345',
      features: ['ads', 'messages', 'analytics']
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnectingDialogOpen, setIsConnectingDialogOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<typeof socialPlatforms[0] | null>(null);
  const [connectingStep, setConnectingStep] = useState(1);
  const [progressValue, setProgressValue] = useState(33);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Platformları filtrele
  const filteredPlatforms = socialPlatforms
    .filter(platform => {
      // Önce arama sorgusuna göre filtrele
      if (!platform.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Sonra sekme seçimine göre filtrele
      if (activeTab === 'all') return true;
      return platform.features?.includes(activeTab);
    });

  // Bağlantı başlat
  const handleConnect = (platform: typeof socialPlatforms[0]) => {
    setConnectingPlatform(platform);
    setConnectingStep(1);
    setProgressValue(33);
    setIsConnectingDialogOpen(true);
    
    // Adım 1'den sonra otomatik olarak adım 2'ye geçiş simülasyonu
    setTimeout(() => {
      setConnectingStep(2);
      setProgressValue(66);
    }, 1500);
  };

  // OAuth bağlantısı ve yönlendirme
  const handleOAuthRedirect = () => {
    // Meta Business platformları için (Facebook, Instagram, WhatsApp)
    window.open('https://business.facebook.com/business-api-integration/', '_blank');
    
    // Simülasyon: 3. adıma geçiş
    setTimeout(() => {
      setConnectingStep(3);
      setProgressValue(100);
      
      // Bağlantı başarılı
      if (connectingPlatform) {
        // Yeni bağlantıyı ekle
        const newConnection: Connection = {
          platformId: connectingPlatform.id,
          status: 'connected',
          connectedAt: new Date(),
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 gün sonra
          accountName: 
            connectingPlatform.id === 'instagram' ? 'Instagram İşletme Hesabı' : 
            connectingPlatform.id === 'facebook' ? 'Facebook Sayfası' : 
            'WhatsApp İşletme Hesabı',
          permissions: connectingPlatform.permissions,
          metaBusinessId: '123456789012345',
          features: connectingPlatform.features
        };
        
        // Mevcut bağlantıları güncelle
        setConnections(prev => {
          const exists = prev.findIndex(conn => conn.platformId === connectingPlatform.id);
          if (exists >= 0) {
            const updated = [...prev];
            updated[exists] = newConnection;
            return updated;
          }
          return [...prev, newConnection];
        });
      }
    }, 3000);
  };

  // Bağlantıyı tamamla
  const handleCompleteConnection = () => {
    setIsConnectingDialogOpen(false);
    toast({
      title: 'Bağlantı Başarılı',
      description: `${connectingPlatform?.name} hesabınız başarıyla bağlandı.`,
    });
  };

  // Bağlantı durumunu test et
  const handleTestConnection = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    const isMessagingPlatform = platform?.features?.includes('messages');
    
    toast({
      title: 'Bağlantı Test Ediliyor',
      description: isMessagingPlatform 
        ? 'Mesajlaşma API bağlantısı test ediliyor...' 
        : 'Reklam verisi API bağlantısı test ediliyor...',
    });
    
    setTimeout(() => {
      toast({
        title: 'Test Başarılı',
        description: isMessagingPlatform
          ? 'Mesajlaşma API bağlantısı aktif ve çalışıyor.'
          : 'Reklam verisi API bağlantısı aktif ve çalışıyor.',
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Sosyal Medya Entegrasyonları</h1>
        <Button variant="outline" onClick={() => setShowBusinessInfo(!showBusinessInfo)}>
          <BookOpen className="mr-2 h-4 w-4" />
          Nasıl Çalışır?
        </Button>
      </div>

      {showBusinessInfo && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle>Meta Business Integration Hakkında</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              CRM sistemimiz Meta Business Integration kullanarak tek bir merkezi hesaptan 
              tüm markaların Facebook, Instagram ve WhatsApp verilerine erişim sağlar. 
              Bu sayede ayrı developer hesaplarına ihtiyaç duymazsınız.
            </p>
            <p className="mb-2">
              <strong>Reklam Verileri:</strong> Kampanya performansınızı, hedef kitle verilerinizi ve ROAS metriklerinizi 
              görüntüleyebilir, analiz edebilirsiniz.
            </p>
            <p className="mb-2">
              <strong>Mesajlaşma Entegrasyonu:</strong> Facebook Sayfası mesajları, Instagram DM'leri ve WhatsApp mesajlarını tek bir panel 
              üzerinden görüntüleyebilir ve yanıtlayabilirsiniz. Müşteri sorguları CRM'e otomatik olarak kaydedilir.
            </p>
            <p>
              Bağlantı kurduğunuzda, Meta Business hesabınızın yetkili kullanıcısı 
              olduğunuzdan emin olun ve gerekli izinleri onaylayın.
            </p>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Platform ara..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlatforms.map(platform => {
          const connection = connections.find(conn => conn.platformId === platform.id);
          
          return (
            <Card key={platform.id} className="overflow-hidden">
              <div className={`h-2 ${platform.color}`} />
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={`p-2 rounded-md ${platform.color} text-white`}>
                  {platform.icon}
                </div>
                <div>
                  <CardTitle>{platform.name}</CardTitle>
                  <CardDescription>
                    {platform.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {connection ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Durum:</span>
                      <Badge variant={connection.status === 'connected' ? 'default' : 'destructive'}>
                        {connection.status === 'connected' ? 'Bağlı' : 'Süresi Doldu'}
                      </Badge>
                    </div>
                    {connection.accountName && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Hesap:</span>
                        <span className="text-sm font-medium">{connection.accountName}</span>
                      </div>
                    )}
                    {connection.metaBusinessId && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Business ID:</span>
                        <span className="text-sm font-medium truncate max-w-[130px]">{connection.metaBusinessId}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Özellikler:</span>
                      <div className="flex gap-1">
                        {connection.features?.includes('ads') && (
                          <Badge variant="outline" className="bg-blue-50">Reklam</Badge>
                        )}
                        {connection.features?.includes('messages') && (
                          <Badge variant="outline" className="bg-green-50">Mesaj</Badge>
                        )}
                        {connection.features?.includes('analytics') && (
                          <Badge variant="outline" className="bg-amber-50">Analitik</Badge>
                        )}
                      </div>
                    </div>
                    {connection.connectedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bağlantı:</span>
                        <span className="text-sm">{connection.connectedAt.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-2 text-center text-muted-foreground text-sm">
                    Bu platform için henüz bağlantı kurulmadı.
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {connection?.status === 'connected' ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestConnection(platform.id)}
                    >
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Test Et
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleConnect(platform)}
                    >
                      Yeniden Bağlan
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleConnect(platform)}
                  >
                    Bağlan
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Bağlantı Sihirbazı Dialog */}
      <Dialog open={isConnectingDialogOpen} onOpenChange={setIsConnectingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {connectingPlatform?.icon}
              <span>{connectingPlatform?.name} Bağlantısı</span>
            </DialogTitle>
            <DialogDescription>
              {connectingStep === 1 && "Bağlantı başlatılıyor..."}
              {connectingStep === 2 && "İşletme hesap erişiminizi onaylayın"}
              {connectingStep === 3 && "Bağlantı tamamlandı!"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            <Progress value={progressValue} className="w-full" />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Başlangıç</span>
              <span>İzinler</span>
              <span>Tamamlandı</span>
            </div>
          </div>
          
          <div className="py-4">
            {connectingStep === 1 && (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
                <p>İşletme hesaplarınız bulunuyor, lütfen bekleyin...</p>
              </div>
            )}
            
            {connectingStep === 2 && (
              <div className="space-y-4">
                <Alert variant="outline" className="border-blue-200 bg-blue-50">
                  <AlertTitle className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Meta Business Yetkilendirme
                  </AlertTitle>
                  <AlertDescription>
                    {connectingPlatform?.features?.includes('messages')
                      ? 'Reklam verilerine ve müşteri mesajlarına erişim için işletme hesabınızın izinleri:'
                      : 'Reklam verilerine erişim için işletme hesabınızın izinleri:'}
                  </AlertDescription>
                </Alert>
                
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium text-sm">Gerekli İzinler:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {connectingPlatform?.permissions.map((permission, index) => (
                      <li key={index} className="text-sm">{permission}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleOAuthRedirect}
                >
                  Meta Business Suite ile Bağlan
                </Button>
              </div>
            )}
            
            {connectingStep === 3 && (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle>Bağlantı Başarılı</AlertTitle>
                  <AlertDescription>
                    {connectingPlatform?.name} işletme hesabınız başarıyla bağlandı. 
                    {connectingPlatform?.features?.includes('messages')
                      ? ' Artık reklam verilerinizi ve mesajlarınızı CRM üzerinden yönetebilirsiniz.'
                      : ' Artık reklam verilerinizi CRM üzerinden görüntüleyebilirsiniz.'}
                  </AlertDescription>
                </Alert>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hesap:</span>
                    <Badge>
                      {connectingPlatform?.id === 'instagram' 
                        ? 'Instagram İşletme Hesabı' 
                        : connectingPlatform?.id === 'facebook' 
                          ? 'Facebook Sayfası' 
                          : 'WhatsApp İşletme Hesabı'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Business ID:</span>
                    <span className="text-xs font-medium">123456789012345</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Özellikler:</span>
                    <div className="flex gap-1">
                      {connectingPlatform?.features?.includes('ads') && (
                        <Badge variant="outline" className="bg-blue-50 text-xs">Reklam</Badge>
                      )}
                      {connectingPlatform?.features?.includes('messages') && (
                        <Badge variant="outline" className="bg-green-50 text-xs">Mesaj</Badge>
                      )}
                      {connectingPlatform?.features?.includes('analytics') && (
                        <Badge variant="outline" className="bg-amber-50 text-xs">Analitik</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Durum:</span>
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                      Aktif
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {connectingStep < 2 && (
              <Button variant="outline" onClick={() => setIsConnectingDialogOpen(false)}>
                İptal
              </Button>
            )}
            
            {connectingStep === 3 && (
              <Button onClick={handleCompleteConnection}>
                Tamam
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold">Platform İstatistikleri</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Bağlı Hesaplar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {connections.filter(c => c.status === 'connected').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {socialPlatforms.length} platformdan
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Toplam Reklam Harcaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.420₺</div>
              <p className="text-xs text-muted-foreground">Son 30 günde</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Aktif Sohbetler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                28
              </div>
              <p className="text-xs text-muted-foreground">Son 7 günde</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Platform Performansı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Facebook</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">2.1x ROAS</span>
                    <span className="text-muted-foreground ml-2">(3.240₺ harcama)</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 mr-2 text-pink-600" />
                    <span>Instagram</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">1.8x ROAS</span>
                    <span className="text-muted-foreground ml-2">(2.180₺ harcama)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mesajlaşma Performansı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">64 mesaj</span>
                    <span className="text-muted-foreground ml-2">(4.2dk ort. yanıt)</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Messenger</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">48 mesaj</span>
                    <span className="text-muted-foreground ml-2">(5.8dk ort. yanıt)</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 mr-2 text-pink-600" />
                    <span>Instagram DM</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">32 mesaj</span>
                    <span className="text-muted-foreground ml-2">(6.5dk ort. yanıt)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegrations; 