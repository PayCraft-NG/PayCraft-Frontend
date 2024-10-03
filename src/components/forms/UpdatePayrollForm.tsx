import { usePayroll } from "@/hooks/payroll/usePayroll";
import { useRemovePayroll } from "@/hooks/payroll/useRemovePayroll";
import { useUpdatePayroll } from "@/hooks/payroll/useUpdatePayroll";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { payrollSchema } from "./CreatePayrollForm";
import { createRenderInput } from "./CreateRenderInput";
import cronstrue from "cronstrue";

export type PayrollForm = z.infer<typeof payrollSchema>;

const UpdatePayrollForm = () => {
	const { payrollId } = useParams();
	const [isEditing, setIsEditing] = useState(false);

	const { data: payrollDetails, isPending: payrollPending } = usePayroll(
		payrollId!
	);

	const { mutate: updatePayroll, isPending } = useUpdatePayroll(payrollId!);

	const { mutate: removePayroll, isPending: isDeleting } = useRemovePayroll();

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PayrollForm>({
		mode: "onChange",
		resolver: zodResolver(payrollSchema),
		values: payrollDetails,
	});

	const renderInput = createRenderInput<PayrollForm>(
		Input,
		register,
		errors,
		isEditing
	);

	const handleEdit = () => {
		setIsEditing(!isEditing);
		reset();
	};

	const onSubmit = (data: PayrollForm) => {
		updatePayroll(data, {
			onSettled: () => setIsEditing(false),
		});
	};

	const handleDelete = () => removePayroll(payrollId!);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<CardTitle className="text-2xl font-bold">Payroll Details</CardTitle>
				<Button
					variant="destructive"
					size="sm"
					onClick={handleDelete}
					disabled={isDeleting || payrollPending}
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete Payroll
				</Button>
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
						className: "font-normal",
					})}
					<div className="flex items-center justify-between">
						<Label
							htmlFor="automatic"
							className="text-sm font-normal"
						>
							Automatic Payroll
						</Label>
						<Controller
							name="automatic"
							control={control}
							render={({ field }) => (
								<Switch
									disabled={!isEditing}
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
							className="text-sm font-normal"
						>
							Frequency
						</Label>
						{isEditing ? (
							<>
								<Controller
									name="cronExpression"
									control={control}
									disabled={!isEditing}
									render={({ field }) => (
										<Cron
											className="my-1 text-sm"
											{...field}
											value={field.value}
											setValue={field.onChange}
											clearButton={false}
										/>
									)}
								/>
								{errors.cronExpression && (
									<p className="text-red-500 font-medium text-xs text-wrap">
										{errors.cronExpression?.message as React.ReactNode}
									</p>
								)}
							</>
						) : (
							<p className="text-sm ml-auto font-semibold mt-2">
								{payrollDetails &&
									cronstrue.toString(payrollDetails.cronExpression)}
							</p>
						)}
					</div>
					<div className="flex justify-end space-x-4">
						<Button
							type="button"
							disabled={payrollPending || isPending}
							onClick={handleEdit}
						>
							{isEditing ? "Cancel" : "Edit"}
						</Button>
						{isEditing && (
							<Button
								type="submit"
								disabled={isPending}
								className="bg-primary text-primary-foreground"
							>
								Save Changes
							</Button>
						)}
					</div>
				</form>
				<div className="space-y-2">
					<Label className="text-sm mb-2">Payroll Info</Label>
					{payrollDetails && (
						<Card>
							<CardContent className="pt-6">
								<div className="grid gap-4 items-center sm:grid-cols-4">
									{payrollDetails.automatic && (
										<>
											<div>
												<Label className="text-sm font-medium">
													Pay Period Start
												</Label>
												<p className="mt-1 text-sm lg:text-base">
													{payrollDetails.payPeriodStart}
												</p>
											</div>

											<div>
												<Label className="text-sm font-medium">
													Pay Period End
												</Label>
												<p className="mt-1 text-sm lg:text-base">
													{payrollDetails?.payPeriodEnd}
												</p>
											</div>
										</>
									)}

									<div>
										<Label className="text-sm font-medium">Last Run Date</Label>
										<p className="mt-1 text-sm lg:text-base">
											{payrollDetails?.lastRunDate}
										</p>
									</div>

									<div>
										<Label className="text-sm font-medium block">Status</Label>
										<Badge
											variant="default"
											className={cn(
												"capitalize",
												payrollDetails?.paymentStatus.toLowerCase() ===
													"completed" && "bg-green-500",
												payrollDetails?.paymentStatus.toLowerCase() ===
													"pending" && "bg-yellow-500",
												payrollDetails?.paymentStatus.toLowerCase() ===
													"failed" && "bg-red-500"
											)}
										>
											{payrollDetails?.paymentStatus}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default UpdatePayrollForm;
