'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, Building2, Cog, Box, Factory, Workflow, Lightbulb, Diff } from 'lucide-react'

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

type SidebarItem = {
  name: string
  path: string
  items?: SidebarItem[]
  icon?: React.ElementType
}

type SidebarData = {
  [key: string]: SidebarItem
}

const sidebarData: SidebarData = {
  company: {
    name: "Company",
    path: "/company",
    icon: Building2,
    items: [
      { name: "About Us", path: "/company/about-us" },
      { name: "News", path: "/company/news" },
      { name: "Events", path: "/company/events" },
      { name: "Join Us", path: "/company/join-us" },
      { name: "Documantations", path: "/company/documantations" }
    ]
  },
  twinScrewExtruders: {
    name: "Twin Screw Extruder",
    path: "/twin-screw-extruders",
    icon: Cog,
    items: [
      { name: "MEX T-ECO", path: "/twin-screw-extruders/mex-t-eco" },
      { name: "MEX T-PRO", path: "/twin-screw-extruders/mex-t-pro" },
      { name: "MEX T-PRO HD", path: "/twin-screw-extruders/mex-t-pro-hd" }
    ]
  },
  equipments: {
    name: "Equipments",
    path: "/equipments",
    icon: Box,
    items: [
      { name: "Loss in Weight Gravimetric Feeder", path: "/equipments/loss-in-weight-gravimetric-feeder" },
      { name: "Container Mixers", path: "/equipments/container-mixers" },
      { name: "Extrusion Melt Pumps", path: "/equipments/extrusion-melt-pumps" },
      { name: "Strand Pelletizers", path: "/equipments/strand-pelletizers" },
      { name: "Packaging", path: "/equipments/packaging" },
      { name: "Vibrating Screener", path: "/equipments/vibrating-screener" },
      { name: "Plastic Melt Filter", path: "/equipments/plastic-melt-filter" },
      { name: "Water Ring Pelletizers", path: "/equipments/water-ring-pelletizers" }
    ]
  },
  extrusion: {
    name: "Extrusion",
    path: "/extrusion",
    icon: Factory,
    items: [
      { name: "Compound Sheet Extrusion", path: "/extrusion/compound-sheet-extrusion" },
      { name: "Tandem Compound Extrusion", path: "/extrusion/tandem-compound-extrusion" },
      { name: "Tandem Recycle Extrusion", path: "/extrusion/tandem-recycle-extrusion" },
      { name: "Hot Melt Extrusion", path: "/extrusion/hot-melt-extrusion" },
      { name: "Thermoset Extrusion", path: "/extrusion/thermoset-extrusion" },
      { name: "Food Extrusion", path: "/extrusion/food-extrusion" },
      { name: "Pharmaceutical Extrusion", path: "/extrusion/pharmaceutical-extrusion" }
    ]
  },
  processes: {
    name: "Processes",
    path: "/processes",
    icon: Workflow,
    items: [
      { name: "Masterbatch", path: "/processes/masterbatch" },
      { name: "Engineering Plastics", path: "/processes/engineering-plastics" },
      { name: "Filled (CaCO3 Calcite) Compounds", path: "/processes/filled-caco3-calcite-compounds" },
      { name: "HFFR Halogen Free Flame Retardant", path: "/processes/hffr-halogen-free-flame-retardant" },
      { name: "PVC Compound", path: "/processes/pvc-compound" },
      { name: "Powder Coating", path: "/processes/powder-coating" },
      { name: "Thermoplastic Elastomers", path: "/processes/thermoplastic-elastomers" },
      { name: "Food Extrusion", path: "/processes/food-extrusion" },
      { name: "Bio Polymers", path: "/processes/bio-polymers" },
      { name: "Heavy Layer - Laminated Sound and Heat Insulation Plate", path: "/processes/heavy-layer-laminated-sound-heat-insulation-plate" },
      { name: "Recycling", path: "/processes/recycling" }
    ]
  },
  rAndD: {
    name: "R & D",
    path: "/r-and-d",
    icon: Lightbulb,
    items: [
      { name: "Process Technologies", path: "/r-and-d/process-technologies" },
      { name: "Ask The Expert", path: "/r-and-d/ask-the-expert" },
      { name: "New Developments", path: "/r-and-d/new-developments" },
      { name: "Know-How", path: "/r-and-d/know-how" }
    ]
  },
  diff: {
    name: "Diff",
    path: "/diff",
    icon: Diff,
    items: [
      { name: "Manufacturing", path: "/diff/manufacturing" },
      { name: "Automation", path: "/diff/automation" },
      { name: "Design", path: "/diff/design" },
      { name: "Spare Parts", path: "/diff/spare-parts" },
      { name: "Education & Maintenance & Service", path: "/diff/education-maintenance-service" }
    ]
  }
}

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    const currentOpenItem = Object.keys(sidebarData).find(key => 
      pathname.startsWith(sidebarData[key].path)
    );
    setOpenItem(currentOpenItem || null);
  }, [pathname]);

  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [pathname, isMobile, setOpenMobile])

  const handleLinkClick = (path: string) => {
    if (isMobile) {
      setOpenMobile(false)
    }
    router.push(path)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-4 py-2">Industrial Solutions</h2>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(sidebarData).map(([key, item]) => (
          <SidebarGroup key={key}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items ? (
                  <CollapsibleMenuItem item={item} onLinkClick={handleLinkClick} isOpen={openItem === key} onOpenChange={(open) => {
                    if (open) {
                      setOpenItem(key);
                    } else if (openItem === key) {
                      setOpenItem(null);
                    }
                  }} />
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.path} onClick={() => handleLinkClick(item.path)}>
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/privacy-policy" onClick={() => handleLinkClick('/privacy-policy')}>
                Privacy Policy
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/contact-us" onClick={() => handleLinkClick('/contact-us')}>
                Contact Us
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function CollapsibleMenuItem({ item, onLinkClick, isOpen, onOpenChange }: { item: SidebarItem; onLinkClick: (path: string) => void; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
  const pathname = usePathname();
  const [localIsOpen, setLocalIsOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setLocalIsOpen(open);
    onOpenChange(open);
  };

  return (
    <Collapsible open={localIsOpen} onOpenChange={handleOpenChange}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="w-full flex justify-between items-center">
          <span className="flex items-center">
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.name}
          </span>
          {localIsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.path}>
              <SidebarMenuSubButton asChild>
                <Link 
                  href={subItem.path}
                  onClick={() => onLinkClick(subItem.path)}
                  className={cn(
                    "w-full text-left",
                    pathname === subItem.path && "font-semibold bg-accent text-accent-foreground"
                  )}
                >
                  {subItem.name}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}