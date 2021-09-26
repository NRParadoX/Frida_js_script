
        // Find the base addr.
        var base_addr=Module.findBaseAddress("libil2cpp.so");
        var hook_addr;
        Get_Hook_Addr("0x9B4758");

function Get_Hook_Addr(offset)
{
    hook_addr=base_addr.add(offset);
    console.log("final hook addr is",hook_addr);
    //��ӡ��ָ��
    console.log(Process.arch);
    var old_instructions=hook_addr.readByteArray(64);
    console.log(" ==== old instructions ==== " + hook_addr);
    console.log(old_instructions);
    InLineHook();
}
        
function InLineHook() //�������޸���ֵ
{
        //��ʼ�滻ָ��
        console.log("Starting substituting")
        Memory.patchCode(hook_addr,8,function (code) {
            let writer = null;
            writer = new ArmWriter(code, { pc: hook_addr });
            /*ע��������ArmConverterת���Ļ�����ַ��������д�����������*/
            console.log("Starting writer.putInstruction(0x010AA0E3);");
            writer.putInstruction(0xE3A00801);//4096 0xE3A00801:65536
            console.log("Starting writer.putInstruction(0x1EFF2FE1);");
            writer.putInstruction(0xE12FFF1E);
            console.log("putInstruction Finished");
           // writer.putBranchAddress(createCallback(callback, instructions, address.add(20), syscallAddress));
            writer.flush();
        });
        //�滻֮���ָ��
        console.log(" ==== new instructions ==== " + hook_addr);
        const new_instructions = hook_addr.readByteArray(64);
        console.log(new_instructions);
}
