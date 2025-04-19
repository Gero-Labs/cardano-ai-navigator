
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const { selectedRiskLevel, setRiskLevel } = useAppContext();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    trade: true,
    rebalance: true,
    error: true,
    newsletter: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    biometrics: true,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Profile</CardTitle>
              <CardDescription>
                Set your preferred risk level for all AI agents
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <RadioGroup
                value={selectedRiskLevel}
                onValueChange={(value: any) => setRiskLevel(value)}
                className="space-y-6"
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="conservative" id="conservative" className="mt-1" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="conservative" className="font-medium">Conservative</Label>
                      <div className="h-3 w-3 rounded-full bg-risk-conservative"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      60% stablecoins, 40% ADA with low volatility.
                    </p>
                    <div className="w-full h-1.5 bg-secondary rounded-full mt-1 flex overflow-hidden">
                      <div className="h-full bg-cardano-primary" style={{ width: "40%" }}></div>
                      <div className="h-full bg-cardano-secondary" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>This setting prioritizes capital preservation with minimal volatility. Suitable for those who want to minimize losses even at the cost of potential gains.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="balanced" id="balanced" className="mt-1" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="balanced" className="font-medium">Balanced</Label>
                      <div className="h-3 w-3 rounded-full bg-risk-balanced"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      50% ADA, 30% mid-cap tokens, 20% stablecoins.
                    </p>
                    <div className="w-full h-1.5 bg-secondary rounded-full mt-1 flex overflow-hidden">
                      <div className="h-full bg-cardano-primary" style={{ width: "50%" }}></div>
                      <div className="h-full bg-cardano-light" style={{ width: "30%" }}></div>
                      <div className="h-full bg-cardano-secondary" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>A middle-ground approach seeking moderate growth while managing downside risk. Suitable for most investors with a medium-term horizon.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="risky" id="risky" className="mt-1" />
                  <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="risky" className="font-medium">Risky</Label>
                      <div className="h-3 w-3 rounded-full bg-risk-risky"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      80% high-volatility tokens, 20% ADA for maximum upside.
                    </p>
                    <div className="w-full h-1.5 bg-secondary rounded-full mt-1 flex overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "80%" }}></div>
                      <div className="h-full bg-cardano-primary" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Maximizes exposure to high-volatility assets, seeking significant returns while accepting higher potential for losses. For experienced investors with a long-term outlook.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trade-notify" className="font-medium">Trade Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when an agent executes a trade
                  </p>
                </div>
                <Switch
                  id="trade-notify"
                  checked={notifications.trade}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, trade: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="rebalance-notify" className="font-medium">Rebalancing Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your portfolio is rebalanced
                  </p>
                </div>
                <Switch
                  id="rebalance-notify"
                  checked={notifications.rebalance}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, rebalance: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="error-notify" className="font-medium">Error Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when an agent encounters an error
                  </p>
                </div>
                <Switch
                  id="error-notify"
                  checked={notifications.error}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, error: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter" className="font-medium">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive our weekly newsletter with market insights
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  checked={notifications.newsletter}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newsletter: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa" className="font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={security.twoFactor}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, twoFactor: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="biometrics" className="font-medium">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face recognition
                  </p>
                </div>
                <Switch
                  id="biometrics"
                  checked={security.biometrics}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, biometrics: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Current Device</p>
                  <p className="text-sm text-muted-foreground">
                    Chrome on macOS
                  </p>
                </div>
                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-muted-foreground">
                    iOS 16.5
                  </p>
                </div>
                <div className="text-xs bg-agent-success/10 text-agent-success px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
