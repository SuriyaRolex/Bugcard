export const AddProjectsFields = [
    {
      type: "text",
      label: "Project Name",
      state_name: "name",
      value: "",
      required: true,
      placeholder:"Enter here"
    },
    {
      type:"text",
      label:"Project Description",
      state_name: "desc",
      value:"",
      required: true,
      placeholder:"Type here"
    },
    
    {
      type: "report",
      title:'Report Configuration',
      subtitle1:'DAST',
      subtitle2:'SAST',
      subtitle3:'Performance Testing',
      state_name: "need_testing",
      value: "",
    },
    {
      type:"alertConfig",
      title:"alertConfiguration",
    },
    {
        type: "thresholdConfig",
        subtitle1:'dats',
        state_name: "is_active",
        value: "",
      },
  ];