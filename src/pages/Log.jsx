/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const Log = ({ supabase }) => {
  const { toast } = useToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function apiCall() {
      const { data } = await supabase
        .from("guest")
        .select()
        .range(0, 4)
        .order("id", { ascending: false });

      setData(data.map((x) => ({ ...x, date: new Date(x.created_at) })));
    }

    apiCall();
  }, [supabase]);

  const copyToClipboard = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({
          title: "Text copied to clipboard: " + value,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy text: " + err,
          variant: "destructive",
        });
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <div className="p-12 flex flex-col items-center gap-12">
        {data.map((x) => {
          const month =
            x.date.getMonth() < 9 ? `0${x.date.getMonth()}` : x.date.getMonth();

          const date =
            x.date.getDate() < 10 ? `0${x.date.getDate()}` : x.date.getDate();

          const hour =
            x.date.getHours() < 10
              ? `0${x.date.getHours()}`
              : x.date.getHours();
          const minute =
            x.date.getMinutes() < 10
              ? `0${x.date.getMinutes()}`
              : x.date.getMinutes();

          return (
            <div
              key={x.id}
              className="flex flex-col items-center gap-2 w-full max-w-sm"
            >
              <span className="self-start text-white">{`${x.date.getFullYear()}-${month}-${date} ${hour}:${minute}`}</span>
              <div className="w-full flex gap-2">
                <Input
                  value={x.name}
                  disabled
                  className="text-left disabled:opacity-100 bg-gray-300 border-primary focus-visible:ring-primary"
                />
                <Button
                  onClick={() => copyToClipboard(x.name)}
                  className="px-6 focus-visible:ring-primary bg-primary text-secondary hover:bg-primary"
                >
                  Copy
                </Button>
              </div>
              <div className="w-full flex gap-2">
                <Input
                  value={x.car}
                  disabled
                  className="text-left disabled:opacity-100 bg-gray-300 border-primary focus-visible:ring-primary"
                />
                <Button
                  onClick={() => copyToClipboard(x.car)}
                  className="px-6 focus-visible:ring-primary bg-primary text-secondary hover:bg-primary"
                >
                  Copy
                </Button>
              </div>
              <div className="w-full flex gap-2">
                <Input
                  value={x.phone}
                  disabled
                  className="text-left disabled:opacity-100 bg-gray-300 border-primary focus-visible:ring-primary"
                />
                <Button
                  onClick={() => copyToClipboard(x.phone)}
                  className="px-6 focus-visible:ring-primary bg-primary text-secondary hover:bg-primary"
                >
                  Copy
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Toaster />
    </>
  );
};

export default Log;
