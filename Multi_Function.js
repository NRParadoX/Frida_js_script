function findSoBase_func() //Ѱ��so����ַ
{

/*------��Ҫhook��so��------*/
var str_libil2cpp_so="libil2cpp.so";

/*------����libil2cpp.soģ��------*/
    //var md_libil2cpp_so=Process.getModuleByName(str_libil2cpp_so);
var md_libil2cpp_so=Process.findModuleByName(str_libil2cpp_so);

/*------Ѱ��so����ַ------*/
    //var addr_libil2cpp_base=Module.findBaseAddress(str_libil2cpp_so);   //Ѱ��so����ַ����1
    //var addr_libil2cpp_base=Module.getBaseAddress(str_libil2cpp_so);    //Ѱ��so����ַ����2
var baseaddr_libil2cpp_so=md_libil2cpp_so.base;
console.log(str_libil2cpp_so+"�Ļ���ַ------"+baseaddr_libil2cpp_so);
}
setImmediate(findSoBase_func,0);

function store_func()  //��Ҫhook��ȫ�������ֿ⼰�����ڴ��ַ
{
/*------��Ҫhook�ĺ�����ͨ��Excel������ȡ------*/
//var offset_name="0x123456789";  //������ƫ�Ƶ�ַ��
var finaladdr_name=baseaddr_libil2cpp_so.add(offset_name);  //�������ڴ��ַ��

}

function hook_func() //ͨ��Interceptor.attach();����hook����
{
	Interceptor.attach(base_func,
		{			
			onEnter: function (args)
			{
				console.log("hook on enter no exp");
				//�޸Ĳ�����args[1]=ptr(10000);args[n]�����n��������ptr����������Ϊ����ֵ
                // send(args[0].toInt32());
                
                 //������һ������
                 call_func(storefor_call_func.func1);
               
			},
			onLeave: function (retval) {

                console.log("hook on Leave no exp");

                //�޸ĺ�������ֵ�ã���1��retval.replace(100000000)��2��retval.replace(ptr("0x1234)  pointer
                // send(retval.toInt32());
			}
		});

}

function storefor_call_func()   //�洢�Ѿ�����������õĺ���
{
    /*u3d�ж��塾�в������ĺ���*/
    var func1 = new NativeFunction(addr1,'void',['int']); //�����á�0x8794E8---void AddCampStars(int numStars)
    var func2 = new NativeFunction(addr1,'pointer',['int']); //�����á�0x8794E8---void AddCampStars(int numStars)
    /*u3d�ж��嶨�塾����Ϊ�ա��ĺ���*/
    var func3 = new NativeFunction(final_addr,'void',[]); 
}




function call_func(func)
{
    /*u3d�ж�����÷���*/
    func.apply(func,[]); //�޲����� Offset = "0x878894" public static void DiscoverAll()
    func.apply(func,[1,2,3,4]);//�в���
}