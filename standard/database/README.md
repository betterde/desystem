# 介绍

如今的项目越来越庞大，模块化分工已成趋势，一个项目的不同模块划分后交由不同的开发人员负责，如果没有同意的规范，最终组合在一起的时候，数据库的完整性、统一性将被破坏。进而影响到程序的稳定性和协调性。

## 设计理念

从项目启动之时，数据库设计工作就已经开始，贯穿于项目前期阶段的需求调研、分析、确认、业务梳理过程，只不过这时的设计大都停留在脑海中，正式的设计过程起始于最终的需求确认完成、业务梳理清晰之后。

先出CDM（Concept Data Model，概念数据模型），再根据实际的数据库类型由CDM导出PDM（Physical Data Model，物理数据模型），最后由PDM将设计成果直接导入到数据库中。同时导出相应的数据库文档，以供项目组开发人员查阅。

CDM设计过程中只做最简单必要的设计，约束、关系、主键、外键、命名规则等在转换成PDM过程中PD可自行处理的部分均交由工具自行处理。就是说数据库设计者只负责工具无法处理的少许部分，工具可完成的部分则用工具统一处理，这样设计工作会更高效省时，最终的设计成果也会更规范合理。

初版数据库设计完成之后进入项目开发阶段，如果前期的需求调研分析、业务梳理没问题，后期数据库结构发生大规模改动的情况不应该频繁出现的。但需求总是在变，意外才是唯一的法则，即便设计者在前期调研、了解、分析、设计的过程中再过谨慎，怕只能减少这种情况出现的风险，却不能完全避免。还有随着开发的深入，数据库结构发生局部变动，比如增删改些表字段等也是再正常不过的了。针对这些，都应该有相应的对策，才能以不变应万变。这里还要提一点，在开发过程中发现少了一些字段，或局部业务有些问题等等，修改后应该通知项目相关技术人员，以避免可能影响到全局的更改出现。

数据库的设计工作虽然集中在项目的业务梳理清晰之后、正式开发之前，但相关细枝末节的工作却不止于此，很可能会贯穿于整个项目的起始流程。

## 如何设计

拿到项目后，完成早期的需求调研，在分析设计的过程中，先考虑的是要实现所需功能、需要的实体有哪些。比如要实现登录功能，那必需要有用户实体。继续扩展思路，登录往往伴随着角色划分，为此要有角色、权限相关的实体。为了记录登录请求，又要有登录日志实体。这些实体表现在数据库即为相应的表，实体确定，同步考虑实体与实体间的关系。一个用户可以有多个角色，一个角色可以被多个用户拥有，所以用户和角色是多对多关系，多对多关系意味着出现中间表。一个用户可以有多条登录日志，一条登录日志有且只能对应一个用户，所以用户和登录日志是一对多的关系，登录日志表中要有外键引用用户表。这就是数据库设计的过程。

数据库的设计往往和前端界面的设计并行，前者稍晚于后者，两者的进行伴随在业务梳理的过程中、前期需求确认之后，为确保对需求理解的准确性、设计的准确性，此过程中应该继续和需求提出者保持沟通。如果在设计数据库时不考虑前端界面设计、或者是在设计界面时不考虑数据库设计，且不说两边对业务需求的理解可能有偏差，即便完全没有，最终怕也不能完好无误的进行融合，这也是为什么觉得项目经理、产品经理、技术经理的角色一人扮演要比三人分饰更好的原因。成熟的社会体制下，人与人间的分工应该更加明确，这无可厚非，问题就出在很多公司分工提前明确了，协作体制却不完善。如此这般，做一件事情参与的人越多，不但不会节省工时，反而导致的问题越多，大大降低了工作效率。

负责数据库设计工作的人应该是最懂项目、最懂业务需求、最有设计经验的人，此人必须跟踪整个项目的设计开发过程，产品界面的设计、程序的开发都要和其沟通确认方可。
