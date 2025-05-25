
import React from 'react';
import { Search, Filter, RefreshCw, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  campaignFilter: string;
  setCampaignFilter: (filter: string) => void;
  dateRangeFilter: string;
  setDateRangeFilter: (filter: string) => void;
  tagFilter: string;
  setTagFilter: (filter: string) => void;
  uniqueCampaigns: string[];
  uniqueTags: string[];
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  dateRangeOptions: { value: string; label: string }[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  setSearchTerm,
  campaignFilter,
  setCampaignFilter,
  dateRangeFilter,
  setDateRangeFilter,
  tagFilter,
  setTagFilter,
  uniqueCampaigns,
  uniqueTags,
  isFiltersOpen,
  setIsFiltersOpen,
  dateRangeOptions
}) => {
  const resetFilters = () => {
    setCampaignFilter('all');
    setDateRangeFilter('all');
    setTagFilter('all');
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Mesajlarda ara..." 
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 bg-white border-slate-200">
              <Filter className="h-4 w-4" />
              <span>Filtreler</span>
              <Badge className="ml-1 bg-primary/10 text-primary">
                {(campaignFilter !== 'all' ? 1 : 0) + 
                 (dateRangeFilter !== 'all' ? 1 : 0) + 
                 (tagFilter !== 'all' ? 1 : 0)}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filtreleme Seçenekleri</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Kampanya</label>
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kampanya Filtresi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                      {uniqueCampaigns.map(campaign => (
                        <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tarih Aralığı</label>
                <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tarih Aralığı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dateRangeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Müşteri Etiketi</label>
                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Müşteri Etiketi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tüm Etiketler</SelectItem>
                      {uniqueTags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetFilters}
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Filtreleri Sıfırla
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  Uygula
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filters display */}
      {(campaignFilter !== 'all' || dateRangeFilter !== 'all' || tagFilter !== 'all') && (
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <span className="text-sm text-slate-600">Aktif filtreler:</span>
          
          {campaignFilter !== 'all' && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
              <span>{campaignFilter}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => setCampaignFilter('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {dateRangeFilter !== 'all' && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
              <span>{dateRangeOptions.find(o => o.value === dateRangeFilter)?.label}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => setDateRangeFilter('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {tagFilter !== 'all' && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-white">
              <Tag className="h-3 w-3 mr-1" />
              <span>{tagFilter}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => setTagFilter('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </>
  );
};

export default FilterPanel;
