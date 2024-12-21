import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main>
      <Label>Subject</Label>
      <Input placeholder="Subject" />
      <Label>Course</Label>
      <Input placeholder="Course" />
    </main>
  );
}
