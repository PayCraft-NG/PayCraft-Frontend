import { useCreatePayroll } from "@/hooks/payroll/useCreatePayroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { createRenderInput } from "./CreateRenderInput";

export const payrollSchema = z.object({
	payrollName: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	automatic: z.boolean(),
	cronExpression: z.string(),
});

type CreatePayrollForm = z.infer<typeof payrollSchema>;

const CreatePayrollForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePayrollForm>({
		mode: "onChange",
		resolver: zodResolver(payrollSchema),
	});

	const renderInput = createRenderInput<CreatePayrollForm>(
		Input,
		register,
		errors
	);

	const { mutate: createPayroll, isPending } = useCreatePayroll();

	const onSubmit = (data: CreatePayrollForm) => {
		console.log(data);
		createPayroll({ ...data, cronExpression: `0 ${data.cronExpression}` });
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg md:text-2xl">
						Create New Payroll
					</CardTitle>
				</div>
				<CardDescription>
					Enter the details of the new payroll here.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{renderInput({
						name: "payrollName",
						label: "Payroll name",
						type: "text",
						placeholder: "Enter payroll name",
					})}
					<div className="flex items-center justify-between">
						<Label
							htmlFor="automatic"
							className="text-sm	"
						>
							Automatic Payroll
						</Label>
						<Controller
							name="automatic"
							control={control}
							render={({ field }) => (
								<Switch
									id="automatic"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
					</div>
					<div>
						<Label
							htmlFor="frequency"
							className="text-sm"
						>
							Frequency
						</Label>
						<Controller
							name="cronExpression"
							control={control}
							render={({ field }) => (
								<Cron
									className="my-1 text-sm"
									{...field}
									value={field.value}
									setValue={field.onChange}
									// humanizeLabels={false}
									// humanizeValue
									clearButton={false}
								/>
							)}
						/>
						{errors.cronExpression && (
							<p className="text-red-500 font-medium text-xs text-wrap">
								{errors.cronExpression?.message as React.ReactNode}
							</p>
						)}
					</div>
					<div className="flex justify-end space-x-4">
						<Button
							disabled={isPending}
							type="submit"
						>
							Create
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreatePayrollForm;
