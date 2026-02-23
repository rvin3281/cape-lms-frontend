import { Card, CardContent } from "../ui/card";

function FormErrorDisplay({ message }: { message: string; items?: [] }) {
  return (
    <Card className="border border-red-500 bg-white rounded-xl py-3 mb-4">
      <CardContent className="flex flex-col gap-1">
        <div className="text-black text-sm leading-relaxed">
          <div className="flex">
            <span className="text-red-700 me-1 text-[16px]">*</span>
            <p className="font-semibold mb-1">{message}</p>
          </div>

          {/* <ul className="list-disc list-inside mt-1">
                  <li>8 or more characters</li>
                  <li>An uppercase letter</li>
                  <li>A number</li>
                  <li>A special character</li>
                </ul> */}
        </div>
      </CardContent>
    </Card>
  );
}
export default FormErrorDisplay;
