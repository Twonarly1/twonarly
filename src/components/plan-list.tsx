import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Up to 100 tasks"],
  },
  {
    name: "Basic",
    price: "$5",
    features: [
      "Unlimited tasks",
      "GitHub integration",
      "Priority support",
      "Custom themes",
      "Early access to new features",
    ],
  },
] as const;

interface Props {
  currentPlan?: string;
  onUpgrade: () => void;
}

const PlansList = ({ currentPlan, onUpgrade }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {plans.map((plan) => {
        const isCurrent = currentPlan
          ? plan.name.toLowerCase() === currentPlan.toLowerCase()
          : plan.name === "Free";

        return (
          <Card key={plan.name}>
            <CardHeader className="mb-3">
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="font-medium text-foreground">{plan.price}</span> / month
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-1.5 border-t py-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="icon-xs shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </CardContent>

            {!isCurrent && (
              <CardFooter>
                <Button size="sm" className="w-full" onClick={onUpgrade}>
                  Upgrade to {plan.name}
                </Button>
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default PlansList;

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const plans = [
//   {
//     name: "Free",
//     price: "$0",
//     description: "For getting started",
//     features: ["Up to 100 tasks"],
//   },
//   {
//     name: "Basic",
//     price: "$5",
//     description: "For power users",
//     features: [
//       "Unlimited tasks",
//       "GitHub integration",
//       "Priority support",
//       "Custom themes",
//       "Early access to new features",
//     ],
//   },
// ] as const;

// interface PlansListProps {
//   currentPlan?: string;
//   onUpgrade: () => void;
//   onManage: () => void;
// }

// const PlansList = ({ currentPlan, onUpgrade, onManage }: PlansListProps) => {
//   return (
//     <div className="grid gap-4 sm:grid-cols-2">
//       {plans.map((plan) => {
//         const isCurrent = currentPlan
//           ? plan.name.toLowerCase() === currentPlan.toLowerCase()
//           : plan.name === "Free";

//         return (
//           <Card key={plan.name} className="w-full max-w-sm">
//             <CardHeader>
//               <CardTitle>{plan.name}</CardTitle>
//               <CardDescription>
//                 <span className="font-medium text-foreground">{plan.price}</span> / month
//                 {" · "}
//                 {plan.description}
//               </CardDescription>
//               {/* <CardAction>
//                 <Button variant="link">Sign Up</Button>
//               </CardAction> */}
//             </CardHeader>
//             <CardContent>content</CardContent>
//             <CardFooter className="flex-col gap-2">
//               <Button type="submit" className="w-full">
//                 Login
//               </Button>
//               <Button variant="outline" className="w-full">
//                 Login with Google
//               </Button>
//             </CardFooter>
//           </Card>
//           // <ItemGroup key={plan.name} className="rounded-lg border">
//           //   <Item size="sm">
//           //     <ItemContent>
//           //       <ItemTitle className="flex items-center gap-2">{plan.name}</ItemTitle>
//           //       <ItemDescription>
//           // <span className="font-medium text-foreground">{plan.price}</span> / month
//           // {" · "}
//           // {plan.description}
//           //       </ItemDescription>

//           //       <div className="mt-1 flex flex-col gap-1.5">
//           //         {plan.features.map((feature) => (
//           //           <div key={feature} className="flex items-center gap-2">
//           //             <Check className="icon-xs shrink-0 text-primary" />
//           //             <span className="text-muted-foreground text-sm">{feature}</span>
//           //           </div>
//           //         ))}
//           //       </div>
//           //     </ItemContent>
//           //   </Item>

//           //   {!isCurrent && (
//           //     <div className="px-4 pb-3">
//           //       <Button size="sm" className="w-full" onClick={onUpgrade}>
//           //         Upgrade to {plan.name}
//           //       </Button>
//           //     </div>
//           //   )}
//           // </ItemGroup>
//         );
//       })}
//     </div>
//   );
// };

// export default PlansList;
