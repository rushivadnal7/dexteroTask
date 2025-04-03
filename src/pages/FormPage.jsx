import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Default from "../layout/Default";

const FormPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };

    return (
        <Default>
            <Container>
                <TabContainer>
                    <Tab active>Personal</Tab>
                    <Tab>Education</Tab>
                    <Tab>Experience</Tab>
                    <Tab>Other</Tab>
                </TabContainer>

                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <Header>
                        <h2>Personal Details</h2>
                        <p>
                            Make changes to your <strong>Profile Account</strong> here.{" "}
                            <span>Click save when you're done.</span>
                        </p>
                    </Header>

                    <InputRow>
                        <InputGroup>
                            <Label>First Name *</Label>
                            <Input {...register("firstName", { required: "First name is required" })} />
                            {errors.firstName && <Error>{errors.firstName.message}</Error>}
                        </InputGroup>

                        <InputGroup>
                            <Label>Middle Name</Label>
                            <Input {...register("middleName")} />
                        </InputGroup>

                        <InputGroup>
                            <Label>Last Name *</Label>
                            <Input {...register("lastName", { required: "Last name is required" })} />
                            {errors.lastName && <Error>{errors.lastName.message}</Error>}
                        </InputGroup>
                    </InputRow>

                    <InputRow>
                        <InputGroup>
                            <Label>Email *</Label>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                                })}
                            />
                            {errors.email && <Error>{errors.email.message}</Error>}
                        </InputGroup>

                        <InputGroup>
                            <Label>Phone *</Label>
                            <Input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
                                })}
                            />
                            {errors.phone && <Error>{errors.phone.message}</Error>}
                        </InputGroup>
                    </InputRow>

                    <InputGroupFull>
                        <Label>Address *</Label>
                        <Textarea {...register("address", { required: "Address is required" })} />
                        {errors.address && <Error>{errors.address.message}</Error>}
                    </InputGroupFull>

                    <InputRow>
                        <InputGroup>
                            <Label>Pin Code *</Label>
                            <Input {...register("pinCode", { required: "Pin Code is required" })} />
                            {errors.pinCode && <Error>{errors.pinCode.message}</Error>}
                        </InputGroup>

                        <InputGroup>
                            <Label>Country *</Label>
                            <Input {...register("country", { required: "Country is required" })} />
                            {errors.country && <Error>{errors.country.message}</Error>}
                        </InputGroup>
                    </InputRow>

                    <InputRow>
                        <InputGroup>
                            <Label>State *</Label>
                            <Input {...register("state", { required: "State is required" })} />
                            {errors.state && <Error>{errors.state.message}</Error>}
                        </InputGroup>

                        <InputGroup>
                            <Label>City *</Label>
                            <Input {...register("city", { required: "City is required" })} />
                            {errors.city && <Error>{errors.city.message}</Error>}
                        </InputGroup>
                    </InputRow>

                    <SubmitButton type="submit">Save</SubmitButton>
                </FormContainer>
            </Container>
        </Default>
    );
};

export default FormPage;

const Container = styled.div`
  margin: auto;
  margin-left: 250px;
  padding: 20px;
  width: 80%;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 15px;
    width: 95%;
    margin-left: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 8px 15px;
  border: none;
  background: ${(props) => (props.active ? "#fff" : "#e0e0e0")};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
`;

const FormContainer = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background: linear-gradient(90deg, #d13666, #4169e1);
  padding: 15px;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
  }

  span {
    background: red;
    padding: 3px 7px;
    border-radius: 3px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  margin: 20px 0;


  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const InputGroupFull = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  /* margin: 10px 0; */
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 80px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const SubmitButton = styled.button`
  width: 50%;
  background: #4169e1;
  color: white;
  padding: 10px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 10px;

  &:hover {
    background: #1e50c2;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
